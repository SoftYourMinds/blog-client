import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IArticle } from '../../core/interfaces/IArticle';


@Injectable({
  providedIn: 'root'
})
export class AuthorPageService {
  private _baseUrl: string = 'http://127.0.0.1:8000/api/articles';

constructor(private http: HttpClient) { }


public findArticlesByAuthor(id: number): Observable<IArticle[]> {
  return this.http.get<IArticle[]>(this._baseUrl + "/by-author/"+id);
}
}
