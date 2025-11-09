# Web2MD Implementation Plan

A CLI tool to crawl websites and convert them to LLM-friendly Markdown files using Bun, TypeScript, and Playwright.

## Overview

**Command**: `web2md https://start.url [OPTIONS]`

**Options**:
- `-i, --include <string>`: Only crawl links that include this string
- `-x, --exclude <string>`: Skip links that include this string  
- `-l, --limit <number>`: Maximum number of pages to crawl
- `-1, --single`: Merge all output into one file (default: separate files)
- `-o, --output <string>`: Output folder (multiple files) or filename (single file)

## Tech Stack

- **Runtime**: Bun (for single executable compilation)
- **Language**: TypeScript
- **Browser Automation**: Playwright
- **HTML to Markdown**: Turndown
- **CLI Framework**: Commander
- **Terminal UI**: Chalk (colors) + Ora (spinners)
- **Concurrency Control**: p-limit

## Project Structure

```
web2md/
├── src/
│   ├── index.ts         # CLI entry point
│   ├── crawler.ts       # Web crawling logic
│   ├── converter.ts     # HTML to Markdown conversion
│   ├── utils.ts         # URL utilities and helpers
│   ├── types.ts         # TypeScript interfaces
│   └── config.ts        # Configuration constants
├── package.json
├── tsconfig.json
├── build.sh             # Build script
└── README.md
```

## Implementation Details

### 1. Package Configuration

**package.json**:
```json
{
  "name": "web2md",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "bun run src/index.ts",
    "build": "bun build --compile ./src/index.ts --outfile web2md",
    "test": "bun test"
  },
  "dependencies": {
    "playwright": "^1.40.0",
    "commander": "^11.0.0",
    "turndown": "^7.1.2",
    "turndown-plugin-gfm": "^1.0.2",
    "chalk": "^5.3.0",
    "ora": "^7.0.1",
    "p-limit": "^5.0.0"
  },
  "devDependencies": {
    "@types/turndown": "^5.0.4",
    "bun-types": "^1.0.0"
  }
}
```

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowJs": true,
    "types": ["bun-types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### 2. Type Definitions (src/types.ts)

```typescript
export interface CLIOptions {
  include?: string;
  exclude?: string;
  limit?: number;
  single?: boolean;
  output?: string;
}

export interface CrawlResult {
  url: string;
  title: string;
  html: string;
  markdown?: string;
  links: string[];
  timestamp: Date;
}

export interface CrawlStats {
  total: number;
  success: number;
  failed: number;
  skipped: number;
}

export interface PageMetadata {
  url: string;
  title: string;
  description?: string;
  crawledAt: string;
}
```

### 3. Configuration (src/config.ts)

```typescript
export const CONFIG = {
  // Crawling
  MAX_CONCURRENT_PAGES: 3,
  PAGE_TIMEOUT: 30000,
  WAIT_FOR_SELECTOR_TIMEOUT: 5000,
  
  // Browser
  BROWSER_ARGS: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage'
  ],
  
  // Content extraction
  REMOVE_SELECTORS: [
    'script',
    'style',
    'nav',
    'header > nav',
    'footer',
    '.advertisement',
    '.ads',
    '#cookie-banner',
    '.popup',
    '.modal'
  ],
  
  // File handling
  DEFAULT_OUTPUT_DIR: './output',
  MAX_FILENAME_LENGTH: 100,
  
  // Turndown options
  TURNDOWN_OPTIONS: {
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined'
  }
};
```

### 4. Main CLI Entry Point (src/index.ts)

```typescript
#!/usr/bin/env bun

import { Command } from 'commander';
import { chromium } from 'playwright';
import chalk from 'chalk';
import ora from 'ora';
import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { WebCrawler } from './crawler';
import { MarkdownConverter } from './converter';
import { CLIOptions } from './types';

// Check Playwright installation
async function checkPlaywright(): Promise<void> {
  const playwrightPath = join(homedir(), '.cache', 'ms-playwright');
  
  if (!existsSync(playwrightPath)) {
    console.error(chalk.red('❌ Playwright browsers not found!'));
    console.log('\nPlease install Playwright browsers first:');
    console.log(chalk.cyan('  npx playwright install chromium'));
    console.log('\nOr install all browsers:');
    console.log(chalk.cyan('  npx playwright install'));
    process.exit(1);
  }
}

async function main() {
  // Check Playwright first
  await checkPlaywright();
  
  // Setup CLI
  const program = new Command();
  
  program
    .name('web2md')
    .description('Crawl websites and convert to Markdown')
    .version('1.0.0')
    .argument('<url>', 'Starting URL to crawl')
    .option('-i, --include <string>', 'Only crawl URLs containing this string')
    .option('-x, --exclude <string>', 'Skip URLs containing this string')
    .option('-l, --limit <number>', 'Maximum pages to crawl', parseInt, 10)
    .option('-1, --single', 'Output to single file', false)
    .option('-o, --output <path>', 'Output path', './output')
    .parse();

  const startUrl = program.args[0];
  const options: CLIOptions = program.opts();
  
  // Validate URL
  try {
    new URL(startUrl);
  } catch {
    console.error(chalk.red('❌ Invalid URL provided'));
    process.exit(1);
  }
  
  // Create output directory if needed
  if (!options.single) {
    mkdirSync(options.output!, { recursive: true });
  }
  
  // Start crawling
  const spinner = ora('Initializing browser...').start();
  
  try {
    // Launch browser
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    spinner.text = 'Starting crawler...';
    
    // Initialize crawler
    const crawler = new WebCrawler(browser);
    const results = await crawler.crawl(startUrl, options, spinner);
    
    spinner.text = 'Converting to Markdown...';
    
    // Convert and save
    const converter = new MarkdownConverter();
    await converter.processResults(results, options);
    
    // Cleanup
    await browser.close();
    
    spinner.succeed(chalk.green(`✅ Successfully processed ${results.length} pages!`));
    
    // Print summary
    console.log(chalk.cyan('\n📊 Summary:'));
    console.log(`  • Pages crawled: ${results.length}`);
    console.log(`  • Output: ${options.output}`);
    
  } catch (error) {
    spinner.fail(chalk.red('❌ Crawling failed'));
    console.error(error);
    process.exit(1);
  }
}

// Run the CLI
main().catch(console.error);
```

### 5. Crawler Implementation (src/crawler.ts)

```typescript
import { Browser, Page } from 'playwright';
import pLimit from 'p-limit';
import { CLIOptions, CrawlResult } from './types';
import { normalizeUrl, shouldCrawlUrl, isSameDomain, extractDomain } from './utils';
import { CONFIG } from './config';
import type { Ora } from 'ora';

export class WebCrawler {
  private browser: Browser;
  private visited: Set<string> = new Set();
  private queue: string[] = [];
  private results: CrawlResult[] = [];
  private limit: any;
  private baseDomain: string = '';
  
  constructor(browser: Browser) {
    this.browser = browser;
    this.limit = pLimit(CONFIG.MAX_CONCURRENT_PAGES);
  }
  
  async crawl(
    startUrl: string, 
    options: CLIOptions,
    spinner: Ora
  ): Promise<CrawlResult[]> {
    this.baseDomain = extractDomain(startUrl);
    this.queue.push(normalizeUrl(startUrl));
    
    let crawledCount = 0;
    const maxPages = options.limit || 10;
    
    while (this.queue.length > 0 && crawledCount < maxPages) {
      // Get batch of URLs to process
      const batch = this.queue.splice(0, CONFIG.MAX_CONCURRENT_PAGES);
      
      // Process batch concurrently
      const promises = batch.map(url => 
        this.limit(async () => {
          if (this.visited.has(url) || crawledCount >= maxPages) {
            return null;
          }
          
          this.visited.add(url);
          spinner.text = `Crawling (${crawledCount + 1}/${maxPages}): ${url}`;
          
          try {
            const result = await this.fetchPage(url, options);
            if (result) {
              crawledCount++;
              
              // Add new links to queue
              for (const link of result.links) {
                const normalizedLink = normalizeUrl(link, url);
                if (
                  !this.visited.has(normalizedLink) &&
                  !this.queue.includes(normalizedLink) &&
                  shouldCrawlUrl(normalizedLink, options) &&
                  isSameDomain(normalizedLink, this.baseDomain)
                ) {
                  this.queue.push(normalizedLink);
                }
              }
              
              return result;
            }
          } catch (error) {
            console.error(`\n⚠️  Failed to crawl ${url}:`, error);
          }
          
          return null;
        })
      );
      
      const batchResults = await Promise.all(promises);
      this.results.push(...batchResults.filter(Boolean) as CrawlResult[]);
    }
    
    return this.results;
  }
  
  private async fetchPage(
    url: string, 
    options: CLIOptions
  ): Promise<CrawlResult | null> {
    const page = await this.browser.newPage();
    
    try {
      // Navigate to page
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: CONFIG.PAGE_TIMEOUT
      });
      
      // Wait for main content
      try {
        await page.waitForSelector('body', { 
          timeout: CONFIG.WAIT_FOR_SELECTOR_TIMEOUT 
        });
      } catch {
        // Continue even if selector not found
      }
      
      // Extract title
      const title = await page.title() || 'Untitled';
      
      // Remove unwanted elements
      for (const selector of CONFIG.REMOVE_SELECTORS) {
        await page.evaluate((sel) => {
          document.querySelectorAll(sel).forEach(el => el.remove());
        }, selector);
      }
      
      // Get HTML content
      const html = await page.content();
      
      // Extract links
      const links = await page.$$eval('a[href]', (anchors) =>
        anchors
          .map(a => (a as HTMLAnchorElement).href)
          .filter(href => href && !href.startsWith('#'))
      );
      
      return {
        url,
        title,
        html,
        links,
        timestamp: new Date()
      };
      
    } finally {
      await page.close();
    }
  }
}
```

### 6. Markdown Converter (src/converter.ts)

```typescript
import TurndownService from 'turndown';
import * as gfm from 'turndown-plugin-gfm';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { CrawlResult, CLIOptions, PageMetadata } from './types';
import { sanitizeFilename } from './utils';
import { CONFIG } from './config';

export class MarkdownConverter {
  private turndown: TurndownService;
  
  constructor() {
    this.turndown = new TurndownService(CONFIG.TURNDOWN_OPTIONS);
    
    // Add GFM support (tables, strikethrough, etc.)
    this.turndown.use(gfm.gfm);
    
    // Custom rules for better LLM-friendly output
    this.setupCustomRules();
  }
  
  private setupCustomRules() {
    // Keep code blocks with language hints
    this.turndown.addRule('codeBlock', {
      filter: ['pre'],
      replacement: (content, node) => {
        const element = node as HTMLElement;
        const codeEl = element.querySelector('code');
        const lang = codeEl?.className.match(/language-(\w+)/)?.[1] || '';
        return `\n\`\`\`${lang}\n${content}\n\`\`\`\n`;
      }
    });
    
    // Better image handling
    this.turndown.addRule('image', {
      filter: 'img',
      replacement: (content, node) => {
        const element = node as HTMLElement;
        const alt = element.getAttribute('alt') || 'image';
        const src = element.getAttribute('src') || '';
        const title = element.getAttribute('title');
        
        return title 
          ? `![${alt}](${src} "${title}")`
          : `![${alt}](${src})`;
      }
    });
    
    // Remove empty paragraphs
    this.turndown.addRule('emptyParagraph', {
      filter: (node) => {
        return node.nodeName === 'P' && 
               !node.textContent?.trim();
      },
      replacement: () => ''
    });
  }
  
  async processResults(results: CrawlResult[], options: CLIOptions) {
    if (options.single) {
      await this.saveAsSingleFile(results, options);
    } else {
      await this.saveAsMultipleFiles(results, options);
    }
  }
  
  private async saveAsSingleFile(results: CrawlResult[], options: CLIOptions) {
    const outputPath = options.output!.endsWith('.md') 
      ? options.output!
      : `${options.output!}.md`;
    
    let combinedMarkdown = '';
    
    for (const result of results) {
      const markdown = this.convertToMarkdown(result);
      const metadata = this.createMetadata(result);
      
      combinedMarkdown += `${metadata}\n\n${markdown}\n\n`;
      combinedMarkdown += '---\n\n'; // Page separator
    }
    
    writeFileSync(outputPath, combinedMarkdown.trim());
  }
  
  private async saveAsMultipleFiles(results: CrawlResult[], options: CLIOptions) {
    for (const result of results) {
      const markdown = this.convertToMarkdown(result);
      const metadata = this.createMetadata(result);
      const fullContent = `${metadata}\n\n${markdown}`;
      
      // Create filename from URL
      const filename = sanitizeFilename(result.url) + '.md';
      const outputPath = join(options.output!, filename);
      
      writeFileSync(outputPath, fullContent);
    }
  }
  
  private convertToMarkdown(result: CrawlResult): string {
    // Clean HTML before conversion
    const cleanedHtml = this.cleanHtml(result.html);
    
    // Convert to markdown
    let markdown = this.turndown.turndown(cleanedHtml);
    
    // Post-process markdown
    markdown = this.postProcessMarkdown(markdown);
    
    return markdown;
  }
  
  private cleanHtml(html: string): string {
    // Remove script and style content
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    
    // Remove comments
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    
    // Remove excessive whitespace
    html = html.replace(/\n\s*\n/g, '\n');
    
    return html;
  }
  
  private postProcessMarkdown(markdown: string): string {
    // Remove multiple consecutive blank lines
    markdown = markdown.replace(/\n{3,}/g, '\n\n');
    
    // Fix spacing around headers
    markdown = markdown.replace(/\n#/g, '\n\n#');
    markdown = markdown.replace(/^#/, '#');
    
    // Ensure code blocks are properly spaced
    markdown = markdown.replace(/```\n/g, '```\n\n');
    markdown = markdown.replace(/\n```/g, '\n\n```');
    
    // Clean up list formatting
    markdown = markdown.replace(/\n- /g, '\n\n- ');
    markdown = markdown.replace(/^\n\n/, '');
    
    return markdown.trim();
  }
  
  private createMetadata(result: CrawlResult): string {
    const metadata: PageMetadata = {
      url: result.url,
      title: result.title,
      crawledAt: result.timestamp.toISOString()
    };
    
    return `---
url: ${metadata.url}
title: ${metadata.title}
crawled: ${metadata.crawledAt}
---

# ${metadata.title}`;
  }
}
```

### 7. Utility Functions (src/utils.ts)

```typescript
import { CLIOptions } from './types';

export function normalizeUrl(url: string, baseUrl?: string): string {
  try {
    // Handle relative URLs
    const fullUrl = baseUrl 
      ? new URL(url, baseUrl).href 
      : new URL(url).href;
    
    // Remove fragment
    const urlObj = new URL(fullUrl);
    urlObj.hash = '';
    
    // Remove trailing slash
    let normalized = urlObj.href;
    if (normalized.endsWith('/') && normalized.length > 1) {
      normalized = normalized.slice(0, -1);
    }
    
    return normalized;
  } catch {
    return url;
  }
}

export function shouldCrawlUrl(
  url: string, 
  options: CLIOptions
): boolean {
  // Check include pattern
  if (options.include && !url.includes(options.include)) {
    return false;
  }
  
  // Check exclude pattern
  if (options.exclude && url.includes(options.exclude)) {
    return false;
  }
  
  // Skip non-HTTP(S) URLs
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }
  
  // Skip common binary files
  const binaryExtensions = [
    '.pdf', '.zip', '.exe', '.dmg', '.pkg',
    '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp',
    '.mp3', '.mp4', '.avi', '.mov', '.wmv'
  ];
  
  const urlLower = url.toLowerCase();
  if (binaryExtensions.some(ext => urlLower.endsWith(ext))) {
    return false;
  }
  
  return true;
}

export function isSameDomain(url: string, baseDomain: string): boolean {
  try {
    const urlDomain = extractDomain(url);
    return urlDomain === baseDomain;
  } catch {
    return false;
  }
}

export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
}

export function sanitizeFilename(url: string): string {
  try {
    const urlObj = new URL(url);
    let filename = urlObj.pathname + urlObj.search;
    
    // Remove leading slash
    if (filename.startsWith('/')) {
      filename = filename.slice(1);
    }
    
    // Replace invalid characters
    filename = filename
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    
    // Use domain if empty
    if (!filename) {
      filename = urlObj.hostname.replace(/\./g, '_');
    }
    
    // Truncate if too long
    if (filename.length > 100) {
      filename = filename.slice(0, 100);
    }
    
    return filename;
  } catch {
    return 'untitled';
  }
}
```

## Build and Usage

### Build Script (build.sh)

```bash
#!/bin/bash

echo "Building web2md..."

# Install dependencies
bun install

# Build executable
bun build --compile ./src/index.ts --outfile web2md

# Make it executable
chmod +x web2md

echo "Build complete! You can now use ./web2md"
```

### Usage Examples

```bash
# Basic crawl (10 pages by default)
./web2md https://example.com

# Crawl with limit
./web2md https://docs.example.com -l 20

# Only crawl documentation pages
./web2md https://example.com -i /docs/ -l 50

# Exclude blog posts
./web2md https://example.com -x /blog/ -l 30

# Output to single file
./web2md https://example.com -1 -o documentation

# Complex example
./web2md https://docs.typescript.com -i /handbook/ -x /play/ -l 100 -o ts-handbook
```

## Development Workflow

```bash
# Install dependencies
bun install

# Run in development mode
bun run dev https://example.com -l 5

# Run tests
bun test

# Build executable
bun run build

# Or use the build script
chmod +x build.sh
./build.sh
```

## Error Handling

The tool handles:
- Invalid URLs
- Network timeouts
- JavaScript-heavy sites (via Playwright)
- Rate limiting (via concurrency control)
- Missing Playwright installation
- File system errors
- Malformed HTML

## Performance Considerations

- **Concurrent crawling**: Uses p-limit to control concurrency (default: 3 pages)
- **Memory management**: Processes pages one at a time for conversion
- **Selective extraction**: Removes unnecessary elements before conversion
- **Smart queuing**: BFS approach with domain restrictions
- **Caching**: Tracks visited URLs to avoid duplicates

## Output Format

Each markdown file includes:
- YAML frontmatter with metadata
- Clean, structured content
- Preserved code blocks with language hints
- Proper heading hierarchy
- LLM-friendly formatting (no navigation, ads, etc.)

Example output:

```markdown
---
url: https://example.com/page
title: Page Title
crawled: 2024-03-14T10:30:00.000Z
---

# Page Title

Main content starts here...

## Section 1

Content...

## Section 2

Content...
```
