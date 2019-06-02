import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import * as deserializers from "../deserializers";

import { CommentJSON } from '../interfaces/comment-json';
import { ArticlesListJSON } from '../interfaces/articles-list-json';
import { ArticleJSON } from '../interfaces/article-json';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  /**
   * accepts query params:
   * page - required: False, 
   */
  getArticles(page: number): Observable<ArticlesListJSON> {
    let params = new HttpParams();

    if (page !== null && page !== undefined) {
      params = params.set('page', page.toString());
    }


    return this.http.get(`http://127.0.0.1:8000/api/articles/`,
        { responseType: 'text', params: params }).pipe(map(data => deserializers.deserializeArticlesListJSON(data)));  }
  /**
   * accepts url params:
   * id - required: False, 
   */
  getArticle(id: number): Observable<ArticleJSON> {

    return this.http.get(`http://127.0.0.1:8000/api/articles/${id}`,
        { responseType: 'text' }).pipe(map(data => deserializers.deserializeArticleJSON(data)));  }
  createArticle(body: ArticleJSON): Observable<ArticleJSON> {

    return this.http.post(`http://127.0.0.1:8000/api/articles/new`, body,
        { responseType: 'text' }).pipe(map(data => deserializers.deserializeArticleJSON(data)));  }
  /**
   * accepts url params:
   * id - required: False, 
   */
  likeArticle(id: number): Observable<any> {

    return this.http.put(`http://127.0.0.1:8000/api/articles/${id}/like`, null,
        { responseType: 'json' });
  }
  /**
   * accepts url params:
   * id - required: False, 
   */
  likeComment(id: number): Observable<any> {

    return this.http.put(`http://127.0.0.1:8000/api/comments/${id}/like`, null,
        { responseType: 'json' });
  }
  /**
   * accepts url params:
   * article_id - required: False, 
   */
  createComment(body: CommentJSON, article_id: number): Observable<CommentJSON> {

    return this.http.post(`http://127.0.0.1:8000/api/articles/${article_id}/comments/new`, body,
        { responseType: 'text' }).pipe(map(data => deserializers.deserializeCommentJSON(data)));  }
  /**
   * accepts url params:
   * tag_name - required: False, 
   */
  getArticlesByTag(tag_name: string): Observable<ArticlesListJSON> {

    return this.http.get(`http://127.0.0.1:8000/api/tags/${tag_name}`,
        { responseType: 'text' }).pipe(map(data => deserializers.deserializeArticlesListJSON(data)));  }
}