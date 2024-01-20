import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { IArticle } from '../../core/interfaces/IArticle';


@Injectable({
  providedIn: 'root'
})
export class AuthorPageService {
  private _baseUrl: string = 'http://127.0.0.1:8000/api/articles';

    public _articleFormSubject: BehaviorSubject<IArticle> = new BehaviorSubject<IArticle>({});
    public $formArticle: Observable<IArticle> = this._articleFormSubject.asObservable();

    public $articles: BehaviorSubject<IArticle[]> = new BehaviorSubject<IArticle[]>([]);

    constructor(private http: HttpClient) {}

    public setFormArticle(article: IArticle): void {
      console.log('service', article);
      this._articleFormSubject.next(article);
    }
  
    public findArticlesByAuthorObserable(id: number): Observable<IArticle[]> {
      return this.http.get<IArticle[]>(this._baseUrl + "/by-author/"+id);
    }

    public onArticleChange(): Observable<IArticle> {
      return this._articleFormSubject.asObservable();
    }
   
    public getArticlesByAuthor(): void {
      if(!this.author) {
        this.$articles.next([]);
        return;
      }
      this.findArticlesByAuthorObserable(this.author.id).pipe(
        take(1)
      ).subscribe((articles) => {
          this.$articles.next(articles);
      })
    }

    public get author() : any {
      let author = localStorage.getItem("author");
      return author ? JSON.parse(author) : {}
    }


   
}
