import {Component, Input, OnInit} from '@angular/core';
import {CommentType} from "../../../../types/comment.type";
import {CommentService} from "../../services/comment.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActionEnum} from "../../../../types/action.enum";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: CommentType;
  action: typeof ActionEnum = ActionEnum;
  commentAction!: ActionEnum | null;

  constructor(private commentService: CommentService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.commentService.getCommentActions(this.comment.id)
      .subscribe(commentAction => {
        this.commentAction = commentAction[0]?.action;
      })
  }

  addAction(action: ActionEnum) {
    this.commentService.applyActionForComment(this.comment.id, action)
      .subscribe({
        next: (result: DefaultResponseType) => {
          if (result.error) {
            throw new Error(result.message);
          }
          if(action === this.action.like) {
            if(this.commentAction === this.action.like) {
              this.comment.likesCount--;
              this.commentAction = null;
            } else if (this.commentAction === this.action.dislike) {
              this.comment.likesCount++;
              this.comment.dislikesCount--;
              this.commentAction = this.action.like;
            } else {
              this.comment.likesCount++;
              this.commentAction = this.action.like;
            }
          }

          if(action === this.action.dislike) {
            if(this.commentAction === this.action.dislike) {
              this.comment.dislikesCount--;
              this.commentAction = null;
            } else if (this.commentAction === this.action.like) {
              this.comment.likesCount--;
              this.comment.dislikesCount++;
              this.commentAction = this.action.dislike;
            } else {
              this.comment.dislikesCount++;
              this.commentAction = this.action.dislike;
            }
          }
          this._snackBar.open('Ваш голос учтен');
          if(action === this.action.violate) {
            this._snackBar.open('Жалоба отправлена');
          }
        },
        error: (error: HttpErrorResponse) => {
          if(action === this.action.violate) {
            this._snackBar.open('Жалоба уже отправлена');
          }
        }
      });
  }

  complaintAction() {
    // this.commentService.applyActionForComment(this.comment.id, 'violate')
    //   .subscribe((result: DefaultResponseType) => {
    //     if (result.error) {
    //       this._snackBar.open('Жалоба уже отправлена');
    //     }
    //     this._snackBar.open('Жалоба отправлена');
    //   });
  }


}
