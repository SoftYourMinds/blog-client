import { IReply } from './../interfaces/IComment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { IComment } from '../interfaces/IComment';

export type CommentAttempt = IComment | 'fail';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private url: string = "http://127.0.0.1:8000/api/comments";

  public $comments: BehaviorSubject<IComment[]> = new BehaviorSubject<IComment[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  private getCommentsObserable(article_id: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(this.url + "?article_id=" + article_id);
  }

  public getCommentsAll(article_id: string): void {
    this.getCommentsObserable(article_id).subscribe({
      next: (comments) => {
        this.$comments.next(comments);
      },
      error: (error) => {
        this.$comments.next([]);
        console.log(error.message);
        
      }
    })
  }

  private createCommentObserable(body: IReply): Observable<IComment> {
    return this.http.post<IComment>(this.url, body)
  }
  
  public createArticleComment(comment: IReply) : Observable<IComment>  {
    
    let body = Object.assign(comment, {parent_id: null})
    console.log(body);
    
    return this.createCommentObserable(body)
      .pipe(
        map((comment) => {
          return comment
        }),
        catchError((error) => {
          console.log(error.message)
          return of({})
        })
      )
  }


  public createReplyComment(body: IReply) : Observable<IComment>  {
    return this.createCommentObserable(body)
    .pipe(
      map((comment) => {
        return comment
      }),
      catchError((error) => {
        console.log(error.message)
        return of({})
      })
    )
  }

  

  
  
  


}
