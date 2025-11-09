import { CLIOptions } from './types';
import { normalize, isAbsolute } from 'path';

const BINARY_EXTENSIONS = [
  '.pdf', '.zip', '.exe', '.dmg', '.pkg',
  '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp',
  '.mp3', '.mp4', '.avi', '.mov', '.wmv'
];

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
  if (options.include?.length && !options.include.some(p => url.includes(p))) {
    return false;
  }

  // Check exclude pattern
  if (options.exclude?.some(p => url.includes(p))) {
    return false;
  }

  // Skip non-HTTP(S) URLs
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }

  // Skip common binary files
  const urlLower = url.toLowerCase();
  if (BINARY_EXTENSIONS.some(ext => urlLower.endsWith(ext))) {
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

function sanitizeHostname(hostname: string): string {
  return hostname
    .replace(/^www\./, '')
    .replace(/\./g, '_');
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
      filename = sanitizeHostname(urlObj.hostname);
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

export function generateDefaultOutput(url: string): string {
  try {
    const urlObj = new URL(url);
    return sanitizeHostname(urlObj.hostname);
  } catch {
    return 'output';
  }
}

export function isPathSafe(outputPath: string, basePath: string): boolean {
  try {
    const normalizedOutput = normalize(outputPath);
    const normalizedBase = normalize(basePath);

    // Check if path is absolute and outside base
    if (isAbsolute(normalizedOutput)) {
      return normalizedOutput.startsWith(normalizedBase);
    }

    // Check for path traversal attempts
    return !normalizedOutput.includes('..');
  } catch {
    return false;
  }
}
