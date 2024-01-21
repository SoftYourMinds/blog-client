import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../shared/materials/material.module';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { ArticleService } from '../core/services/article.service';
import { IArticle } from '../core/interfaces/IArticle';
import { HeaderComponent } from '../core/components/header/header.component';
import { UiModule } from '../shared/ui/ui.module';
import { ArticleCardComponent } from './components/article-card/article-card.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    HeaderComponent,
    UiModule,
    ArticleCardComponent,
  ],
  providers: [
    ArticleService,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  article: IArticle = {}
  article_id: string = '';

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.article_id = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.article_id);
    

    this.isLoading = true;
    this.articleService.getArticleById(this.article_id).subscribe({
      next: (article) => {  
        this.isLoading = false;
        this.article = article
      },
      error: (error) => {
        this.article = {}
        this.isLoading = false;
        console.log(error.message);
      }
    });
  }

  







  
}
