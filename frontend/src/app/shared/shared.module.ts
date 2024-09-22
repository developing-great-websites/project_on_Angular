import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { RequestComponent } from './components/request/request.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import {RouterModule} from "@angular/router";
import {NgxMaskModule} from "ngx-mask";
import {CommentComponent} from "./components/comment/comment.component";


@NgModule({
  declarations: [LoaderComponent, RequestComponent, ArticleCardComponent, CommentComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [LoaderComponent, RequestComponent, ArticleCardComponent, CommentComponent],
})
export class SharedModule { }
