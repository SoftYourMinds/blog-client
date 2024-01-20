import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../shared/materials/material.module';
import { CommonModule, DatePipe } from '@angular/common';
import { UiModule } from '../../../shared/ui/ui.module';
import { IArticle } from '../../../core/interfaces/IArticle';
import { AuthorPageService } from '../../services/author-page.service';


@Component({
  selector: 'app-author-articles',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
    DatePipe
  ],
  providers: [
    // AuthorPageService,
  ],
  templateUrl: './author-articles.component.html',
  styleUrl: './author-articles.component.scss'
})
export class AuthorArticlesComponent {
    public articles: IArticle[] = [];

    displayedColumns: string[] = ['title', 'category', 'date', 'edit'];

    constructor(
     private authorPageService: AuthorPageService,
    ) {}

    ngOnInit(): void {

      this.authorPageService.getArticlesByAuthor();
      this.initArticlesObserver();
  

    }

    private initArticlesObserver(): void {
        this.authorPageService.$articles.subscribe(
          (articles) => {
            this.articles = articles.reverse();
          }
        )
    }

    public sendArticleToEdit(id: number): void {
      let article = this.getArticleById(id);
      this.authorPageService.setFormArticle(article)      
    }

    public getArticleById(id: number): IArticle {
      let article = this.articles.find(article => article.id === id);
      if(article) return article
      return {}
    }
    

}
