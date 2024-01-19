import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = "http://127.0.0.1:8000/api/categories";

  constructor(private http: HttpClient) { }

  public getCategoriesAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url);
  }
}
