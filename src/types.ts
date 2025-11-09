export interface CLIOptions {
  include?: string[];
  exclude?: string[];
  limit?: number;
  single?: boolean;
  output?: string;
  clean?: string;
}

export interface CrawlResult {
  url: string;
  title: string;
  html: string;
  links: string[];
  timestamp: Date;
}

export interface PageMetadata {
  url: string;
  title: string;
  description?: string;
  crawledAt: string;
}
