import { CommentsService } from './../../../../core/services/comments.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../shared/materials/material.module';
import { UiModule } from '../../../../shared/ui/ui.module';
import { IComment, IReply } from '../../../../core/interfaces/IComment';
import { AuthorService } from '../../../../core/services/author.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})


export class CommentComponent {
    @Input() comment: IComment = {}

    private _reply: IReply = {}

    public replyContentControl: FormControl;

    public isAttempFailed: boolean = false;
    public isShowAttemptReply: boolean = false;


    constructor(
      private datePipe: DatePipe,
      private commentsService: CommentsService,
      private authorService: AuthorService,
      private route: ActivatedRoute,
    ){
     
    }

    ngOnInit(): void {
      this.replyContentControl = new FormControl('', [Validators.required]);    
      this._reply.article_id = this.route.snapshot.paramMap.get('id') || '';
      this._reply.parent_id = this.comment.id;
      this._reply.name = this.authorService.author.name || 'anonim';
    }

    public createReply() {
      this._reply.content = this.replyContent;
      console.log(this._reply);
      
      this.isShowAttemptReply = true;
      this.commentsService.createReplyComment(this.attemptReply).subscribe(
        (comment) =>  this.approveAttemt(comment)
      );

    }

    private approveAttemt(comment: IComment): void {
      console.log(comment);
      
      if("id" in comment) {
        this.isShowAttemptReply = false;
        this.replies.unshift(comment);
        this.replyContentControl.reset();
      } else {
        this.isAttempFailed = true;
      }
    }

    public closeFailedAttemptReply() {
      this.isShowAttemptReply = false;
      this.isAttempFailed =  false;
    }

    get name(): string {
      return this.comment.name || 'anonim'
    }

    get content(): string {
      return this.comment.content || ''
    }

    get isReplies(): boolean {
      return this.replies.length ? true : false;
    }

    get replies(): IComment[] {
      return this.comment.replies || []
    }

    get date(): string {
      let date = this.datePipe.transform(this.comment.updated_at, 'short');
      return date ? date : '';
    }

    get replyContent(): string {
      return this.replyContentControl.value;
    }

    get attemptReply(): IReply {
      return this._reply;
    }

 }
