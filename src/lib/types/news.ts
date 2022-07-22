import type { Source } from './sources';

export interface NewsItem {
  uid: string;
  title: string;
  description: string;
  url: string;
  date: Date;
  authors?: string[];
  image?: string;
  category?: string;
  categories?: string[];
  tags?: string[];
  source?: Source;
}
