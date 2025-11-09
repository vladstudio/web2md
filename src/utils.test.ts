import { describe, test, expect } from 'bun:test';
import {
  normalizeUrl,
  shouldCrawlUrl,
  isSameDomain,
  extractDomain,
  sanitizeFilename,
  generateDefaultOutput,
  isPathSafe
} from './utils';
import type { CLIOptions } from './types';

describe('normalizeUrl', () => {
  test('removes fragment from URL', () => {
    const url = 'https://example.com/page#section';
    expect(normalizeUrl(url)).toBe('https://example.com/page');
  });

  test('removes trailing slash', () => {
    const url = 'https://example.com/page/';
    expect(normalizeUrl(url)).toBe('https://example.com/page');
  });

  test('removes trailing slash even for root', () => {
    const url = 'https://example.com/';
    expect(normalizeUrl(url)).toBe('https://example.com');
  });

  test('handles relative URLs with base', () => {
    const url = '/about';
    const base = 'https://example.com/page';
    expect(normalizeUrl(url, base)).toBe('https://example.com/about');
  });

  test('handles relative path with base', () => {
    const url = '../other';
    const base = 'https://example.com/a/b/c';
    expect(normalizeUrl(url, base)).toBe('https://example.com/a/other');
  });

  test('returns original URL on invalid input', () => {
    const url = 'not-a-url';
    expect(normalizeUrl(url)).toBe(url);
  });
});

describe('shouldCrawlUrl', () => {
  test('allows URL with no filters', () => {
    const options: CLIOptions = {};
    expect(shouldCrawlUrl('https://example.com/page', options)).toBe(true);
  });

  test('respects include filter', () => {
    const options: CLIOptions = { include: '/blog' };
    expect(shouldCrawlUrl('https://example.com/blog/post', options)).toBe(true);
    expect(shouldCrawlUrl('https://example.com/about', options)).toBe(false);
  });

  test('respects exclude filter', () => {
    const options: CLIOptions = { exclude: '/admin' };
    expect(shouldCrawlUrl('https://example.com/page', options)).toBe(true);
    expect(shouldCrawlUrl('https://example.com/admin/panel', options)).toBe(false);
  });

  test('combines include and exclude filters', () => {
    const options: CLIOptions = { include: '/blog', exclude: '/draft' };
    expect(shouldCrawlUrl('https://example.com/blog/post', options)).toBe(true);
    expect(shouldCrawlUrl('https://example.com/blog/draft', options)).toBe(false);
    expect(shouldCrawlUrl('https://example.com/about', options)).toBe(false);
  });

  test('rejects non-HTTP(S) URLs', () => {
    const options: CLIOptions = {};
    expect(shouldCrawlUrl('ftp://example.com/file', options)).toBe(false);
    expect(shouldCrawlUrl('mailto:test@example.com', options)).toBe(false);
    expect(shouldCrawlUrl('javascript:void(0)', options)).toBe(false);
  });

  test('rejects binary file extensions', () => {
    const options: CLIOptions = {};
    expect(shouldCrawlUrl('https://example.com/file.pdf', options)).toBe(false);
    expect(shouldCrawlUrl('https://example.com/file.zip', options)).toBe(false);
    expect(shouldCrawlUrl('https://example.com/image.jpg', options)).toBe(false);
    expect(shouldCrawlUrl('https://example.com/image.PNG', options)).toBe(false); // case insensitive
  });

  test('allows HTML pages', () => {
    const options: CLIOptions = {};
    expect(shouldCrawlUrl('https://example.com/page.html', options)).toBe(true);
    expect(shouldCrawlUrl('https://example.com/page', options)).toBe(true);
  });
});

describe('extractDomain', () => {
  test('extracts domain from URL', () => {
    expect(extractDomain('https://example.com/page')).toBe('example.com');
    expect(extractDomain('https://www.example.com/page')).toBe('www.example.com');
    expect(extractDomain('https://subdomain.example.com')).toBe('subdomain.example.com');
  });

  test('handles different protocols', () => {
    expect(extractDomain('http://example.com')).toBe('example.com');
    expect(extractDomain('https://example.com')).toBe('example.com');
  });

  test('handles ports', () => {
    expect(extractDomain('https://example.com:8080/page')).toBe('example.com');
  });

  test('returns empty string on invalid URL', () => {
    expect(extractDomain('not-a-url')).toBe('');
  });
});

describe('isSameDomain', () => {
  test('returns true for same domain', () => {
    expect(isSameDomain('https://example.com/page1', 'example.com')).toBe(true);
    expect(isSameDomain('https://example.com/page2', 'example.com')).toBe(true);
  });

  test('returns false for different domain', () => {
    expect(isSameDomain('https://other.com/page', 'example.com')).toBe(false);
  });

  test('distinguishes www from non-www', () => {
    expect(isSameDomain('https://www.example.com', 'example.com')).toBe(false);
    expect(isSameDomain('https://example.com', 'www.example.com')).toBe(false);
  });

  test('returns false for invalid URLs', () => {
    expect(isSameDomain('not-a-url', 'example.com')).toBe(false);
  });
});

describe('sanitizeFilename', () => {
  test('sanitizes path to valid filename', () => {
    expect(sanitizeFilename('https://example.com/blog/post-1')).toBe('blog_post-1');
  });

  test('replaces invalid characters with underscore', () => {
    expect(sanitizeFilename('https://example.com/path?query=value&other=2')).toBe('path_query_value_other_2');
  });

  test('removes leading slash', () => {
    expect(sanitizeFilename('https://example.com/page')).toBe('page');
  });

  test('uses domain when path is empty', () => {
    expect(sanitizeFilename('https://example.com')).toBe('example_com');
    expect(sanitizeFilename('https://example.com/')).toBe('example_com');
  });

  test('removes www from domain', () => {
    expect(sanitizeFilename('https://www.example.com')).toBe('example_com');
  });

  test('truncates long filenames', () => {
    const longPath = 'https://example.com/' + 'a'.repeat(150);
    const result = sanitizeFilename(longPath);
    expect(result.length).toBeLessThanOrEqual(100);
  });

  test('returns "untitled" for invalid URLs', () => {
    expect(sanitizeFilename('not-a-url')).toBe('untitled');
  });

  test('handles multiple consecutive slashes', () => {
    expect(sanitizeFilename('https://example.com/path//to///page')).toBe('path_to_page');
  });
});

describe('generateDefaultOutput', () => {
  test('generates output name from hostname', () => {
    expect(generateDefaultOutput('https://example.com')).toBe('example_com');
  });

  test('removes www prefix', () => {
    expect(generateDefaultOutput('https://www.example.com')).toBe('example_com');
  });

  test('handles subdomains', () => {
    expect(generateDefaultOutput('https://blog.example.com')).toBe('blog_example_com');
  });

  test('returns "output" for invalid URL', () => {
    expect(generateDefaultOutput('not-a-url')).toBe('output');
  });
});

describe('isPathSafe', () => {
  const basePath = '/Users/test/project';

  test('allows relative path without traversal', () => {
    expect(isPathSafe('output', basePath)).toBe(true);
    expect(isPathSafe('output/files', basePath)).toBe(true);
  });

  test('rejects path traversal attempts', () => {
    expect(isPathSafe('../../../etc/passwd', basePath)).toBe(false);
    expect(isPathSafe('output/../../other', basePath)).toBe(false);
  });

  test('allows absolute path within base', () => {
    expect(isPathSafe('/Users/test/project/output', basePath)).toBe(true);
  });

  test('rejects absolute path outside base', () => {
    expect(isPathSafe('/etc/passwd', basePath)).toBe(false);
    expect(isPathSafe('/Users/other/file', basePath)).toBe(false);
  });

  test('handles edge cases', () => {
    expect(isPathSafe('', basePath)).toBe(true);
    expect(isPathSafe('.', basePath)).toBe(true);
  });
});
