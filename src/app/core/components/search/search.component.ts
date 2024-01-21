import { ArticleComponent } from './../../../main/article/article.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materials/material.module';
import { FormControl, FormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Route, Router, RouterEvent } from '@angular/router';
import { extractTags } from '../../helpers/extractTags';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,

  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public value: string = '';

  constructor(
    private articleService: ArticleService,
    private router: Router,
  ){}

  public getArticlesByTagsOrName(title: string, tags: string[]): void {
    this.articleService.isArticlesLoading = true;
    this.articleService.findArticlesByNameTags(title, tags).subscribe({
      next: (articles) => {
        this.articleService.isArticlesLoading = false;
        this.articleService.setArticles(articles)
      },
      error: (error) => {
        console.log(error.message);
        this.articleService.isArticlesLoading = false;
      }
    })
  }
  
  public search() {
    let tags = extractTags(this.value);
    let name = this.value;
    if(tags.length != 0 ) {
      name = "";
    }
    console.log(name, tags);
    
    this.getArticlesByTagsOrName(name, tags);
  }  

  public resetArticles() {
    this.value = '';
    this.router.navigate(['/blog']);
    this.articleService.getArticlesAll();
  }

  

  



}
