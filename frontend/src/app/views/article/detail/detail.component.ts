import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {environment} from "../../../../environments/environment";
import {ArticleWithCommentsType} from "../../../../types/articleWithComments.type";
import {ArticleType} from "../../../../types/article.type";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentsType} from "../../../../types/comments.type";
import {CommentService} from "../../../shared/services/comment.service";
import {CommentType} from "../../../../types/comment.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  commentForm = this.fb.group({
    comment: ['', [Validators.required]]
  });

  get comment() {
    return this.commentForm.get('comment');
  }

  article!: ArticleWithCommentsType;
  relatedArticles: ArticleType[] = [];
  serverStaticPath = environment.serverStaticPath;
  isLogged: boolean = false;
  comments: CommentType[] = [];
  offset: number = 13;
  urlParam: string = '';

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.urlParam = params['url'];
      this.showArticle(this.urlParam);

      this.articleService.getRelatedArticles(params['url'])
        .subscribe((articles: ArticleType[]) => {
          this.relatedArticles = articles;
        });
    });

    this.authService.isLogged$
      .subscribe((isLoggedIn: boolean) => {
        this.isLogged = isLoggedIn;
      });
  }

  showArticle(params: string) {
    this.articleService.getArticle(params)
      .subscribe((article: ArticleWithCommentsType) => {
        this.article = article;
        console.log(this.article);
        this.comments = article.comments;
      });
  }

  showComments(commentsCount: number, articleId: string) {
    this.offset = commentsCount;
    const param = {
      offset: this.offset,
      article: articleId
    }
    this.commentService.getComments(param)
      .subscribe((commentsResult: CommentsType) => {
        this.comments = this.comments.concat(commentsResult.comments);
      });
  }


  publicComment(articleId: string, commentsCount: number) {
    if (this.commentForm.value.comment) {
      const params = {
        text: this.commentForm.value.comment,
        article: articleId
      }
      this.commentService.addComment(params)
        .subscribe((result: DefaultResponseType) => {
          if (result) {
            console.log(result);
            this.showArticle(this.urlParam);
            this.commentForm.reset();
          }
        });
    }
  }
}


