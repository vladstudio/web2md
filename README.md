# web2md

A CLI tool that crawls websites and converts them to clean, LLM-friendly Markdown.

## Features

- **Smart Crawling**: Follows links within the same domain with concurrency control
- **Clean Conversion**: Removes navigation, ads, scripts, and other noise
- **LLM Enhancement**: Optional markdown cleanup using Claude, Gemini, or OpenAI
- **Flexible Output**: Single file or multi-file output
- **URL Filtering**: Include/exclude patterns for selective crawling

## Installation

```bash
bun install
bun run build
```

Or install Playwright browsers if not already installed:
```bash
bunx playwright install chromium
```

## Usage

Basic usage:
```bash
./web2md https://example.com
```

Advanced usage:
```bash
./web2md https://docs.example.com \
  --include "/docs" "/guides" \
  --exclude "/api" "/blog" \
  --limit 50 \
  --output ./output \
  --single \
  --clean anthropic:claude-haiku-4-5
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--include <patterns...>` | URL patterns to include | `["/"]` |
| `--exclude <patterns...>` | URL patterns to exclude | `[]` |
| `--limit <number>` | Maximum pages to crawl | `100` |
| `--output <path>` | Output directory | `./output` |
| `--single` | Combine all pages into one file | `false` |
| `--clean <provider:model>` | Clean markdown with LLM | none |

### LLM Cleaning

Requires API key in environment:
- `anthropic:claude-haiku-4-5` → needs `ANTHROPIC_API_KEY`
- `google:gemini-1.5-flash` → needs `GEMINI_API_KEY`
- `openai:gpt-4o-mini` → needs `OPENAI_API_KEY`

## Development

```bash
bun run dev https://example.com    # Run without building
bun test                            # Run tests
bun run clean                       # Remove build artifacts
```

## How It Works

1. Launches headless Chromium via Playwright
2. Crawls pages concurrently (max 3 at a time)
3. Extracts main content, removing clutter
4. Converts HTML to Markdown using Turndown
5. Optionally cleans output with LLM
6. Saves as `.md` files

## Tech Stack

Built with [Bun](https://bun.sh), TypeScript, Playwright, and Turndown.
