import { Component, Input } from '@angular/core';
import { IArticle } from '../../core/interfaces/IArticle';
import { MaterialModule } from '../../shared/materials/material.module';
import { UiModule } from '../../shared/ui/ui.module';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    MaterialModule,
    UiModule,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  @Input() article: IArticle = {}
}
