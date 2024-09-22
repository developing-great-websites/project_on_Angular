import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ArticleType} from "../../../types/article.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleWithCommentsType} from "../../../types/articleWithComments.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getTopArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  getArticles(params: ActiveParamsType): Observable<{ count: number, pages: number, items: ArticleType[] }> {
    return this.http.get<{ count: number, pages: number, items: ArticleType[] }>(environment.api + 'articles', {
      params: params
    });
  }

  getArticle(url: string): Observable<ArticleWithCommentsType> {
    return this.http.get<ArticleWithCommentsType>(environment.api + 'articles/' + url);
  }

  getRelatedArticles(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + url);
  }
}
