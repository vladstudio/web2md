import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { writeFileSync, mkdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { CrawlResult, CLIOptions, PageMetadata } from './types';
import { sanitizeFilename, isPathSafe } from './utils';
import { CONFIG } from './config';

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

  processResults(results: CrawlResult[], options: CLIOptions) {
    if (options.single) {
      this.saveAsSingleFile(results, options);
    } else {
      this.saveAsMultipleFiles(results, options);
    }
  }

  private saveAsSingleFile(results: CrawlResult[], options: CLIOptions) {
    const outputPath = options.output!.endsWith('.md')
      ? options.output!
      : `${options.output!}.md`;

    // Ensure parent directory exists
    const dir = dirname(outputPath);
    mkdirSync(dir, { recursive: true });

    const pages = results.map(result => {
      const markdown = this.convertToMarkdown(result);
      const metadata = this.createMetadata(result);
      return `${metadata}\n\n${markdown}`;
    });

    const combinedMarkdown = pages.join('\n\n---\n\n');
    writeFileSync(outputPath, combinedMarkdown);
  }

  private saveAsMultipleFiles(results: CrawlResult[], options: CLIOptions) {
    const baseDir = resolve(options.output!);

    for (const result of results) {
      const markdown = this.convertToMarkdown(result);
      const metadata = this.createMetadata(result);
      const fullContent = `${metadata}\n\n${markdown}`;

      const filename = sanitizeFilename(result.url) + '.md';
      const outputPath = join(baseDir, filename);

      // Safety check - ensure we're writing inside the output directory
      if (!outputPath.startsWith(baseDir)) {
        console.warn(`⚠️  Skipping unsafe path: ${filename}`);
        continue;
      }

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
crawled: ${metadata.crawledAt}
---

# ${metadata.title}`;
  }
}
