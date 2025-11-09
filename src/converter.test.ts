import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import { MarkdownConverter } from './converter';
import { CrawlResult, CLIOptions } from './types';
import { existsSync, readFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

describe('MarkdownConverter', () => {
  let converter: MarkdownConverter;
  const testOutputDir = join(process.cwd(), 'test-output');

  beforeEach(() => {
    converter = new MarkdownConverter();
    // Clean up test directory
    if (existsSync(testOutputDir)) {
      rmSync(testOutputDir, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    // Clean up after tests
    if (existsSync(testOutputDir)) {
      rmSync(testOutputDir, { recursive: true, force: true });
    }
  });

  describe('HTML to Markdown conversion', () => {
    test('converts basic HTML to markdown', () => {
      const result: CrawlResult = {
        url: 'https://example.com',
        title: 'Test Page',
        html: '<html><body><h1>Hello</h1><p>World</p></body></html>',
        links: [],
        timestamp: new Date()
      };

      const options: CLIOptions = {
        output: join(testOutputDir, 'test.md'),
        single: true
      };

      converter.processResults([result], options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).toContain('# Hello');
      expect(content).toContain('World');
      expect(content).toContain('url: https://example.com');
      expect(content).toContain('title: Test Page');
    });

    test('converts code blocks with language', () => {
      const result: CrawlResult = {
        url: 'https://example.com',
        title: 'Code Example',
        html: '<html><body><pre><code class="language-javascript">const x = 1;</code></pre></body></html>',
        links: [],
        timestamp: new Date()
      };

      const options: CLIOptions = {
        output: join(testOutputDir, 'test.md'),
        single: true
      };

      converter.processResults([result], options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).toContain('```javascript');
      expect(content).toContain('const x = 1;');
      expect(content).toContain('```');
    });

    test('converts images with alt text', () => {
      const result: CrawlResult = {
        url: 'https://example.com',
        title: 'Images',
        html: '<html><body><img src="test.jpg" alt="Test Image" /></body></html>',
        links: [],
        timestamp: new Date()
      };

      const options: CLIOptions = {
        output: join(testOutputDir, 'test.md'),
        single: true
      };

      converter.processResults([result], options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).toContain('![Test Image](test.jpg)');
    });

    test('converts images with title', () => {
      const result: CrawlResult = {
        url: 'https://example.com',
        title: 'Images',
        html: '<html><body><img src="test.jpg" alt="Test" title="Image Title" /></body></html>',
        links: [],
        timestamp: new Date()
      };

      const options: CLIOptions = {
        output: join(testOutputDir, 'test.md'),
        single: true
      };

      converter.processResults([result], options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).toContain('![Test](test.jpg "Image Title")');
    });

    test('removes script tags', () => {
      const result: CrawlResult = {
        url: 'https://example.com',
        title: 'Clean',
        html: '<html><body><p>Content</p><script>alert("test")</script></body></html>',
        links: [],
        timestamp: new Date()
      };

      const options: CLIOptions = {
        output: join(testOutputDir, 'test.md'),
        single: true
      };

      converter.processResults([result], options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).not.toContain('alert');
      expect(content).not.toContain('script');
      expect(content).toContain('Content');
    });

    test('removes style tags', () => {
      const result: CrawlResult = {
        url: 'https://example.com',
        title: 'Clean',
        html: '<html><body><p>Content</p><style>.test { color: red; }</style></body></html>',
        links: [],
        timestamp: new Date()
      };

      const options: CLIOptions = {
        output: join(testOutputDir, 'test.md'),
        single: true
      };

      converter.processResults([result], options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).not.toContain('.test');
      expect(content).not.toContain('color: red');
      expect(content).toContain('Content');
    });

    test('removes HTML comments', () => {
      const result: CrawlResult = {
        url: 'https://example.com',
        title: 'Clean',
        html: '<html><body><!-- comment --><p>Content</p></body></html>',
        links: [],
        timestamp: new Date()
      };

      const options: CLIOptions = {
        output: join(testOutputDir, 'test.md'),
        single: true
      };

      converter.processResults([result], options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).not.toContain('<!-- comment -->');
      expect(content).toContain('Content');
    });
  });

  describe('Single file output', () => {
    test('combines multiple pages with separators', () => {
      const results: CrawlResult[] = [
        {
          url: 'https://example.com/page1',
          title: 'Page 1',
          html: '<html><body><h1>First</h1></body></html>',
          links: [],
          timestamp: new Date()
        },
        {
          url: 'https://example.com/page2',
          title: 'Page 2',
          html: '<html><body><h1>Second</h1></body></html>',
          links: [],
          timestamp: new Date()
        }
      ];

      const options: CLIOptions = {
        output: join(testOutputDir, 'combined.md'),
        single: true
      };

      converter.processResults(results, options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).toContain('Page 1');
      expect(content).toContain('Page 2');
      expect(content).toContain('# First');
      expect(content).toContain('# Second');
      expect(content).toContain('---'); // Separator
    });

    test('adds .md extension if missing', () => {
      const results: CrawlResult[] = [{
        url: 'https://example.com',
        title: 'Test',
        html: '<html><body><p>Content</p></body></html>',
        links: [],
        timestamp: new Date()
      }];

      const options: CLIOptions = {
        output: join(testOutputDir, 'output'),
        single: true
      };

      converter.processResults(results, options);

      expect(existsSync(join(testOutputDir, 'output.md'))).toBe(true);
    });
  });

  describe('Multiple files output', () => {
    test('creates separate files for each page', () => {
      mkdirSync(testOutputDir, { recursive: true });

      const results: CrawlResult[] = [
        {
          url: 'https://example.com/page1',
          title: 'Page 1',
          html: '<html><body><h1>First</h1></body></html>',
          links: [],
          timestamp: new Date()
        },
        {
          url: 'https://example.com/page2',
          title: 'Page 2',
          html: '<html><body><h1>Second</h1></body></html>',
          links: [],
          timestamp: new Date()
        }
      ];

      const options: CLIOptions = {
        output: testOutputDir,
        single: false
      };

      converter.processResults(results, options);

      const files = ['page1.md', 'page2.md'];
      for (const file of files) {
        expect(existsSync(join(testOutputDir, file))).toBe(true);
      }

      const content1 = readFileSync(join(testOutputDir, 'page1.md'), 'utf-8');
      expect(content1).toContain('Page 1');
      expect(content1).toContain('# First');

      const content2 = readFileSync(join(testOutputDir, 'page2.md'), 'utf-8');
      expect(content2).toContain('Page 2');
      expect(content2).toContain('# Second');
    });

    test('sanitizes filenames', () => {
      mkdirSync(testOutputDir, { recursive: true });

      const results: CrawlResult[] = [{
        url: 'https://example.com/path/with?query=params&other=value',
        title: 'Test',
        html: '<html><body><p>Content</p></body></html>',
        links: [],
        timestamp: new Date()
      }];

      const options: CLIOptions = {
        output: testOutputDir,
        single: false
      };

      converter.processResults(results, options);

      // Should have sanitized filename
      const files = Bun.file(testOutputDir);
      const dir = require('fs').readdirSync(testOutputDir);
      expect(dir.some((f: string) => f.includes('_'))).toBe(true);
      expect(dir.some((f: string) => f.includes('?'))).toBe(false);
    });
  });

  describe('Metadata generation', () => {
    test('includes URL, title, and timestamp', () => {
      const timestamp = new Date('2024-01-01T12:00:00Z');
      const result: CrawlResult = {
        url: 'https://example.com/test',
        title: 'Test Page',
        html: '<html><body><p>Content</p></body></html>',
        links: [],
        timestamp
      };

      const options: CLIOptions = {
        output: join(testOutputDir, 'test.md'),
        single: true
      };

      converter.processResults([result], options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).toContain('url: https://example.com/test');
      expect(content).toContain('title: Test Page');
      expect(content).toContain('crawled: 2024-01-01T12:00:00.000Z');
    });

    test('frontmatter is valid YAML format', () => {
      const result: CrawlResult = {
        url: 'https://example.com',
        title: 'Test',
        html: '<html><body><p>Content</p></body></html>',
        links: [],
        timestamp: new Date()
      };

      const options: CLIOptions = {
        output: join(testOutputDir, 'test.md'),
        single: true
      };

      converter.processResults([result], options);

      const content = readFileSync(options.output!, 'utf-8');
      expect(content).toMatch(/^---\n/);
      expect(content).toContain('\n---\n');
    });
  });
});
