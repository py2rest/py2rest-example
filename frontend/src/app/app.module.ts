import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Route, RouterModule} from "@angular/router";
import { ArticleListComponent } from './components/article-list/article-list.component';
import {ApiService} from "./gen/services/api.service";
import {HttpClientModule} from "@angular/common/http";
import { ArticleCreationComponent } from './components/article-creation/article-creation.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ArticleDetailsComponent } from './components/article-details/article-details.component';

const appRoute = [
  { path: '', component: ArticleListComponent },
  { path: 'article/create', component: ArticleCreationComponent },
  { path: 'article/:id', component: ArticleDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleCreationComponent,
    ArticleDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoute),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
