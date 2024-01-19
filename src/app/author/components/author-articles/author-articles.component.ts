import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../shared/materials/material.module';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../../shared/ui/ui.module';
import { IArticle } from '../../../core/interfaces/IArticle';


@Component({
  selector: 'app-author-articles',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
  ],
  templateUrl: './author-articles.component.html',
  styleUrl: './author-articles.component.scss'
})
export class AuthorArticlesComponent {
    @Input() articles: IArticle[] = [];

    displayedColumns: string[] = ['position', 'title', 'content', 'category', 'edit'];
}
