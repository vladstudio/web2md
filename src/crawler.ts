import { Browser } from 'playwright';
import pLimit, { type LimitFunction } from 'p-limit';
import { CLIOptions, CrawlResult } from './types';
import { normalizeUrl, shouldCrawlUrl, isSameDomain, extractDomain } from './utils';
import { CONFIG } from './config';
import type { Ora } from 'ora';

export class WebCrawler {
  private browser: Browser;
  private visited: Set<string> = new Set();
  private queued: Set<string> = new Set();
  private queue: string[] = [];
  private results: CrawlResult[] = [];
  private limit: LimitFunction;
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
    const normalizedStart = normalizeUrl(startUrl);
    this.queue.push(normalizedStart);
    this.queued.add(normalizedStart);

    const maxPages = options.limit || 10;

    while (this.queue.length > 0 && this.results.length < maxPages) {
      // Get batch of URLs to process
      const batchSize = Math.min(
        CONFIG.MAX_CONCURRENT_PAGES,
        maxPages - this.results.length
      );
      const batch = this.queue.splice(0, batchSize);

      // Process batch concurrently
      const promises = batch.map(url =>
        this.limit(async () => {
          if (this.visited.has(url) || this.results.length >= maxPages) {
            return null;
          }

          this.visited.add(url);
          spinner.text = `Crawling (${this.results.length + 1}/${maxPages}): ${url}`;

          try {
            const result = await this.fetchPage(url);
            if (result) {
              // Add new links to queue
              for (const link of result.links) {
                const normalizedLink = normalizeUrl(link, url);
                if (
                  !this.visited.has(normalizedLink) &&
                  !this.queued.has(normalizedLink) &&
                  shouldCrawlUrl(normalizedLink, options) &&
                  isSameDomain(normalizedLink, this.baseDomain)
                ) {
                  this.queue.push(normalizedLink);
                  this.queued.add(normalizedLink);
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

  private async fetchPage(url: string): Promise<CrawlResult | null> {
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

      // Extract links BEFORE removing nav elements
      const links = await page.$$eval('a[href]', (anchors) =>
        anchors
          .map(a => (a as HTMLAnchorElement).href)
          .filter(href => href && !href.startsWith('#'))
      );

      // Remove unwanted elements
      for (const selector of CONFIG.REMOVE_SELECTORS) {
        await page.evaluate((sel) => {
          document.querySelectorAll(sel).forEach(el => el.remove());
        }, selector);
      }

      // Get HTML content
      const html = await page.content();

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
