import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { writeFileSync, mkdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { CrawlResult, CLIOptions, PageMetadata } from './types';
import { sanitizeFilename, isPathSafe } from './utils';
import { CONFIG } from './config';
import { cleanMarkdown } from './llm-cleaner';
import type { Ora } from 'ora';

export class MarkdownConverter {
  private turndown: TurndownService;

  constructor() {
    this.turndown = new TurndownService(CONFIG.TURNDOWN_OPTIONS);

    // Add GFM support (tables, strikethrough, etc.)
    this.turndown.use(gfm);

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

  async processResults(results: CrawlResult[], options: CLIOptions, spinner?: Ora) {
    if (options.single) {
      await this.saveAsSingleFile(results, options, spinner);
    } else {
      await this.saveAsMultipleFiles(results, options, spinner);
    }
  }

  private async saveAsSingleFile(results: CrawlResult[], options: CLIOptions, spinner?: Ora) {
    const outputPath = options.output!.endsWith('.md')
      ? options.output!
      : `${options.output!}.md`;

    // Ensure parent directory exists
    const dir = dirname(outputPath);
    mkdirSync(dir, { recursive: true });

    const pages: string[] = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const filename = sanitizeFilename(result.url);
      if (spinner) {
        spinner.text = `Converting to Markdown: ${filename} (${i + 1}/${results.length})`;
      }

      const markdown = await this.convertToMarkdown(result, options);
      const metadata = this.createMetadata(result);
      pages.push(`${metadata}\n\n${markdown}`);
    }

    const combinedMarkdown = pages.join('\n\n---\n\n');
    writeFileSync(outputPath, combinedMarkdown);
  }

  private async saveAsMultipleFiles(results: CrawlResult[], options: CLIOptions, spinner?: Ora) {
    const baseDir = resolve(options.output!);

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const filename = sanitizeFilename(result.url);
      if (spinner) {
        spinner.text = `Converting to Markdown: ${filename} (${i + 1}/${results.length})`;
      }

      const markdown = await this.convertToMarkdown(result, options);
      const metadata = this.createMetadata(result);
      const fullContent = `${metadata}\n\n${markdown}`;

      const outputPath = join(baseDir, filename + '.md');

      // Safety check - ensure we're writing inside the output directory
      if (!outputPath.startsWith(baseDir)) {
        console.warn(`⚠️  Skipping unsafe path: ${filename}`);
        continue;
      }

      writeFileSync(outputPath, fullContent);
    }
  }

  private async convertToMarkdown(result: CrawlResult, options: CLIOptions): Promise<string> {
    // Clean HTML before conversion
    const cleanedHtml = this.cleanHtml(result.html);

    // Convert to markdown
    let markdown = this.turndown.turndown(cleanedHtml);

    // Post-process markdown
    markdown = this.postProcessMarkdown(markdown);

    // Clean with LLM if requested
    if (options.clean) {
      markdown = await cleanMarkdown(markdown, options.clean);
    }

    return markdown;
  }

  private cleanHtml(html: string): string {
    // Defensive cleanup - these should already be removed in the browser
    // but we clean again in case of any issues during content extraction
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    html = html.replace(/<!--[\s\S]*?-->/g, '');

    return html;
  }

  private postProcessMarkdown(markdown: string): string {
    return markdown
      .replace(/\n{3,}/g, '\n\n')        // Max 2 consecutive newlines
      .replace(/\n(#{1,6} )/g, '\n\n$1') // Space before headers
      .replace(/^(#{1,6} )/, '$1')       // No space before first header
      .trim();
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
---

# ${metadata.title}`;
  }
}
