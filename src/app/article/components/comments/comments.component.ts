import { Component, Input } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/materials/material.module';
import { UiModule } from '../../../shared/ui/ui.module';
import { IComment, IReply } from '../../../core/interfaces/IComment';
import { AuthorService } from '../../../core/services/author.service';
import { ActivatedRoute } from '@angular/router';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UiModule,
    CommentComponent
  ],
  // providers: [
  //   CommentsService,
  // ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  public comments: IComment[] = []

  private _comment: IReply = {}


  public isAttempFailed: boolean = false;
  public isShowAttemptComment: boolean = false;
  // public leaveComment: FormGroup 
  commentFormControl: FormControl


  constructor(
    private commentsService: CommentsService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
  ){
    this._comment.article_id = this.route.snapshot.paramMap.get('id') || '';
    this._comment.name = this.authorService.author.name || 'anonim';
  }

  ngOnInit(): void {
    this.commentFormControl = new FormControl('', [Validators.required]);

    this.commentsService.$comments.subscribe((comments) => {
      this.comments = comments;
    })
    
  }

  public createComment() {
    this._comment.content = this.commentContent;

    this.isShowAttemptComment = true;
    this.commentsService.createArticleComment(this.attemptComment).subscribe(
      (comment) =>  this.approveAttemt(comment)
    );

  }

  private approveAttemt(comment: IComment): void {
    if("id" in comment) {
      this.isShowAttemptComment = false;
      this.comments.unshift(comment);
      this.commentFormControl.reset();
    } else {
      this.isAttempFailed = true;
    }
  }

  public closeFailedAttemptComment() {
    this.isShowAttemptComment = false;
    this.isAttempFailed =  false;
  }

  get commentContent(): string {
    return this.commentFormControl.value
  }

  get attemptComment(): IReply {
    return this._comment;
  }

}
