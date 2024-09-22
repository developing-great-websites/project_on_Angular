import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CommentsParamsType} from "../../../types/comments-params.type";
import {CommentsType} from "../../../types/comments.type";
import {AddCommentType} from "../../../types/add-comment.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {CommentActionType} from "../../../types/comment-action.type";
import {ActionEnum} from "../../../types/action.enum";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(params: CommentsParamsType): Observable<CommentsType> {
    return this.http.get<CommentsType>(environment.api + 'comments', {
      params: params
    });
  }

  addComment(params: AddCommentType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', params)
  }

  applyActionForComment(id: string, action: ActionEnum): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action', {
      action: action
    });
  }

  getCommentActions(id: string): Observable<CommentActionType[]> {
    return this.http.get<CommentActionType[]>(environment.api + 'comments/' + id + '/actions');
  }
}
