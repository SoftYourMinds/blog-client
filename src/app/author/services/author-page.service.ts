import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IArticle } from '../../core/interfaces/IArticle';


@Injectable({
  providedIn: 'root'
})
export class AuthorPageService {
  private _baseUrl: string = 'http://127.0.0.1:8000/api/articles';

    public _articleFormSubject: BehaviorSubject<IArticle> = new BehaviorSubject<IArticle>({});
    public $formArticle: Observable<IArticle> = this._articleFormSubject.asObservable();


    constructor(private http: HttpClient) { }

    public setFormArticle(article: IArticle): void {
      console.log('service', article);
      this._articleFormSubject.next(article);
      console.log("value", this._articleFormSubject.value)
    }
  
  public findArticlesByAuthor(id: number): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this._baseUrl + "/by-author/"+id);
  }

   public onArticleChange(): Observable<IArticle> {
    return this._articleFormSubject.asObservable();
   }
}
