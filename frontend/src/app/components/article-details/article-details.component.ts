import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../gen/services/api.service";
import {ActivatedRoute} from "@angular/router";
import {ArticleJSON} from "../../gen/interfaces/article-json";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  commentForm: FormGroup;
  details$: Observable<ArticleJSON>;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      'author': new FormControl('', [Validators.required]),
      'content': new FormControl('', Validators.required),
    });

    this.getDetails(this.route.snapshot.paramMap.get('id'))
  }

  getDetails(id) {
    this.details$ = this.apiService.getArticle(id);
  }

  likeArticle(details) {
    this.apiService.likeArticle(details.id).subscribe(resp => ++details.likesCount);
  }

  onComment(details) {
    this.apiService.createComment(this.commentForm.value, details.id).subscribe(cmt => details.comments.unshift(cmt));
  }

  onCommentLike(comment) {
    this.apiService.likeComment(comment.id).subscribe(resp => ++comment.likesCount);
  }
}
