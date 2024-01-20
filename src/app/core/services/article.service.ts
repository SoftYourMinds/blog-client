import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IArticle } from '../interfaces/IArticle';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _baseUrl: string = 'http://127.0.0.1:8000/api/articles';
  private _articleUrl: string = 'http://127.0.0.1:8000/api/article';



  private _articlesSubject = new BehaviorSubject<IArticle[]>([]);
  public $articles: Observable<IArticle[]> = this._articlesSubject

  constructor(private http: HttpClient) { }

  public getArticlesAll(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this._baseUrl);
  }

  public getArticleById(article_id: string): Observable<IArticle> {
    return this.http.get<IArticle>(this._baseUrl+"/"+article_id);
  }

  public updateArticle(body: IArticle): Observable<IArticle> {
    return this.http.put<IArticle>(this._baseUrl+"/update", body);
  }

  public createArticle(body: IArticle): Observable<IArticle> {
    return this.http.post<IArticle>(this._baseUrl, body);
  }

  public deleteArticle(id: number): Observable<string> {
    return this.http.delete<string>(this._baseUrl+"/"+id);
  }

  public findArticlesByNameTags(title: string, tags: string[]): Observable<IArticle[]> {
    return this.http.post<IArticle[]>(this._baseUrl + "/by-name-tags", {title, tags});
  }

  public findArticlesByCategory(category: number): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this._baseUrl + "/by-category/"+ category);
  }


  public setArticles(articles: IArticle[]) {
    this._articlesSubject.next(articles);
  }

  public get articles(): IArticle[] {
    return this._articlesSubject.getValue();
  }

  
}
