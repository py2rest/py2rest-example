import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../gen/services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  form: FormGroup;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'author': new FormControl('', [Validators.required]),
      'tags': new FormControl('', [Validators.required]),
      'content': new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let obj = this.form.value;
      console.log(obj);
      obj.tags = obj.tags.replace(/\s/g,'-').split(',');
      this.apiService.createArticle(obj).subscribe(created => this.router.navigate(['/article', created.id]));
    }
  }

}
