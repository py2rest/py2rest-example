import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../gen/services/api.service";
import {Observable} from "rxjs";
import {ArticlesListJSON} from "../../gen/interfaces/articles-list-json";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  page = 1;
  articles$: Observable<ArticlesListJSON>;
  tag: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tag = params.tag;
      this.retrieveArticles(this.tag);
    });
  }

  previousPage() {
    if (this.page > 1) {
      --this.page;
    }
    this.retrieveArticles();
  }

  nextPage() {
    ++this.page;
    this.retrieveArticles();
  }

  retrieveArticles(tag = null) {
    if (tag) {
      this.articles$ = this.apiService.getArticlesByTag(tag);
    } else {
      this.articles$ = this.apiService.getArticles(this.page);
    }
  }

}
