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
import { generateDefaultOutput, isPathSafe } from './utils';
import { CONFIG } from './config';

// Check Playwright installation
async function checkPlaywright(): Promise<void> {
  // Check both Linux (~/.cache) and macOS (~/Library/Caches) paths
  const linuxPath = join(homedir(), '.cache', 'ms-playwright');
  const macPath = join(homedir(), 'Library', 'Caches', 'ms-playwright');

  if (!existsSync(linuxPath) && !existsSync(macPath)) {
    console.error(chalk.red('❌ Playwright browsers not found!'));
    console.log('\nPlease install Playwright browsers first:');
    console.log(chalk.cyan('  bunx playwright install chromium'));
    console.log('\nOr install all browsers:');
    console.log(chalk.cyan('  bunx playwright install'));
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
    .option('-i, --include <string>', 'Only crawl URLs containing this string', (v, p) => p.concat([v]), [])
    .option('-x, --exclude <string>', 'Skip URLs containing this string', (v, p) => p.concat([v]), [])
    .option('-l, --limit <number>', 'Maximum pages to crawl', parseInt, 10)
    .option('-1, --single', 'Output to single file', false)
    .option('-o, --output <path>', 'Output path (defaults to URL-based name)')
    .option('-c, --clean <provider:model>', `Clean markdown with LLM
                  Anthropic: claude-3-5-haiku-20241022, claude-3-haiku-20240307, claude-haiku-4-5
                  Gemini: gemini-2.5-flash-lite, gemini-2.0-flash-lite, gemini-1.5-flash
                  OpenAI: gpt-4o-mini, gpt-4.1-nano, gpt-3.5-turbo`)
    .showHelpAfterError()
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

  // Generate default output if not provided
  if (!options.output) {
    const defaultName = generateDefaultOutput(startUrl);
    options.output = options.single ? `${defaultName}.md` : defaultName;
  }

  const outputPath = options.output;

  // Validate output path safety
  if (!isPathSafe(outputPath, process.cwd())) {
    console.error(chalk.red('❌ Invalid output path - path traversal detected'));
    process.exit(1);
  }

  // Create output directory if needed
  if (!options.single) {
    try {
      mkdirSync(outputPath, { recursive: true });
    } catch (error) {
      console.error(chalk.red('❌ Failed to create output directory'));
      console.error(error);
      process.exit(1);
    }
  }

  // Start crawling
  const spinner = ora('Initializing browser...').start();

  try {
    // Launch browser
    const browser = await chromium.launch({
      headless: true,
      args: CONFIG.BROWSER_ARGS
    });

    spinner.text = 'Starting crawler...';

    // Initialize crawler
    const crawler = new WebCrawler(browser);
    const results = await crawler.crawl(startUrl, options, spinner);

    spinner.text = 'Converting to Markdown...';

    // Convert and save
    const converter = new MarkdownConverter();
    await converter.processResults(results, options, spinner);

    // Cleanup
    await browser.close();

    spinner.succeed(chalk.green(`✅ Successfully processed ${results.length} pages!`));

    // Print summary
    console.log(chalk.cyan('\n📊 Summary:'));
    console.log(`  • Pages crawled: ${results.length}`);
    console.log(`  • Output: ${outputPath}`);

  } catch (error) {
    spinner.fail(chalk.red('❌ Crawling failed'));
    console.error(error);
    process.exit(1);
  }
}

// Run the CLI
main().catch(console.error);
