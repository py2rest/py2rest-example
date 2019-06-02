import { CommentJSON } from './comment-json';

export interface ArticleJSON {
  id?: number;
  title: string;
  author: string;
  content: string;
  createdDate?: Date;
  likesCount?: number;
  comments?: CommentJSON[];
  tags?: string[];
}
