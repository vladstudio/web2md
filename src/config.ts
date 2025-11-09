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
  MAX_FILENAME_LENGTH: 100,

  // Turndown options
  TURNDOWN_OPTIONS: {
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined'
  } as const
};
