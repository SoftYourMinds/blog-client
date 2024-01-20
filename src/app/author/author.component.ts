import { AuthorService } from './../core/services/author.service';
import { Component } from '@angular/core';
import { UiModule } from '../shared/ui/ui.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/materials/material.module';
import { HeaderComponent } from '../core/components/header/header.component';
import { AuthorArticlesComponent } from './components/author-articles/author-articles.component';
import { ArticleService } from '../core/services/article.service';
import { AuthorPageService } from './services/author-page.service';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { IAuthor } from '../core/interfaces/IAuthor';
import { IArticle } from '../core/interfaces/IArticle';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    MaterialModule,
    HeaderComponent,
    AuthorArticlesComponent,
    ArticleFormComponent,
  ],
  providers: [
    AuthorPageService,
    AuthorService,
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent {
     
}
