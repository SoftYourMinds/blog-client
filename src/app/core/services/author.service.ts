import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthor } from '../interfaces/IAuthor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private registrationUrl: string = "http://127.0.0.1:8000/api/registration";
  private loginUrl: string = "http://127.0.0.1:8000/api/login";

  constructor(private http: HttpClient,
      private router: Router) {}

  public signup(credentials: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(this.registrationUrl,  credentials);
  }

  public login(credentials: IAuthor): Observable<IAuthor> {
    return this.http.post<IAuthor>(this.loginUrl,  credentials);
  }

  public logout(): void {
    localStorage.removeItem('author');
    this.router.navigate(['/blog'])
  }
  
  public get author() : IAuthor {
    let author = localStorage.getItem("author");
    return author ? JSON.parse(author) : {}
  }
  
}
