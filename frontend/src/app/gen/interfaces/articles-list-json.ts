import { ArticleJSON } from './article-json';

export interface ArticlesListJSON {
  articles?: ArticleJSON[];
  pagesCount?: number;
}
