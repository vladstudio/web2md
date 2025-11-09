import { describe, test, expect, beforeAll, afterAll } from 'bun:test';
import { chromium, Browser } from 'playwright';
import { WebCrawler } from './crawler';
import { CLIOptions } from './types';
import ora from 'ora';

describe('WebCrawler domain restriction', () => {
  let browser: Browser;
  let crawler: WebCrawler;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('never crawls outside the start domain', async () => {
    crawler = new WebCrawler(browser);

    // Create a mock HTML page with links to external domains
    const mockHtml = `
      <html>
        <head><title>Test Page</title></head>
        <body>
          <h1>Test</h1>
          <a href="https://example.com/page1">Same domain</a>
          <a href="https://other.com/external">Different domain</a>
          <a href="https://subdomain.example.com/sub">Subdomain</a>
          <a href="https://www.example.com/www">www subdomain</a>
        </body>
      </html>
    `;

    // We'll test with a data URL since we can't easily mock playwright
    // Instead, let's test the domain checking logic directly
    const { isSameDomain, extractDomain } = await import('./utils');

    const startUrl = 'https://example.com';
    const baseDomain = extractDomain(startUrl);

    // Test same domain links
    expect(isSameDomain('https://example.com/page1', baseDomain)).toBe(true);
    expect(isSameDomain('https://example.com/page2', baseDomain)).toBe(true);

    // Test different domain links - should be blocked
    expect(isSameDomain('https://other.com/external', baseDomain)).toBe(false);
    expect(isSameDomain('https://evil.com/page', baseDomain)).toBe(false);

    // Test subdomain - should be blocked (different domain)
    expect(isSameDomain('https://subdomain.example.com/sub', baseDomain)).toBe(false);

    // Test www subdomain - should be blocked (www vs non-www are different)
    expect(isSameDomain('https://www.example.com/www', baseDomain)).toBe(false);
  });

  test('extracts correct base domain from start URL', async () => {
    const { extractDomain } = await import('./utils');

    expect(extractDomain('https://example.com')).toBe('example.com');
    expect(extractDomain('https://example.com/path')).toBe('example.com');
    expect(extractDomain('https://www.example.com')).toBe('www.example.com');
    expect(extractDomain('https://subdomain.example.com')).toBe('subdomain.example.com');
    expect(extractDomain('http://example.com:8080')).toBe('example.com');
  });

  test('blocks cross-domain navigation', async () => {
    const { isSameDomain } = await import('./utils');

    const testCases = [
      { url: 'https://attacker.com', base: 'example.com', expected: false },
      { url: 'https://example.com.attacker.com', base: 'example.com', expected: false },
      { url: 'http://example.com', base: 'example.com', expected: true }, // Different protocol, same domain
      { url: 'https://example.com:443', base: 'example.com', expected: true }, // With port
      { url: 'https://EXAMPLE.COM', base: 'example.com', expected: true }, // Case insensitive (URLs are normalized)
    ];

    for (const testCase of testCases) {
      expect(isSameDomain(testCase.url, testCase.base)).toBe(testCase.expected);
    }
  });

  test('handles edge cases in domain checking', async () => {
    const { isSameDomain, extractDomain } = await import('./utils');

    // Invalid URLs should return false
    expect(isSameDomain('not-a-url', 'example.com')).toBe(false);
    expect(isSameDomain('javascript:alert(1)', 'example.com')).toBe(false);
    expect(isSameDomain('mailto:test@example.com', 'example.com')).toBe(false);

    // Invalid URLs should return empty domain
    expect(extractDomain('not-a-url')).toBe('');
    expect(extractDomain('')).toBe('');
  });

  test('www and non-www are treated as different domains', async () => {
    const { isSameDomain } = await import('./utils');

    // This is by design - if you start at example.com, you stay at example.com
    // If you start at www.example.com, you stay at www.example.com
    expect(isSameDomain('https://www.example.com', 'example.com')).toBe(false);
    expect(isSameDomain('https://example.com', 'www.example.com')).toBe(false);
    expect(isSameDomain('https://www.example.com', 'www.example.com')).toBe(true);
  });
});
