import { Component, Input } from '@angular/core';
import { IArticle } from '../../core/interfaces/IArticle';
import { MaterialModule } from '../../shared/materials/material.module';
import { UiModule } from '../../shared/ui/ui.module';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    MaterialModule,
    UiModule
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  @Input() article: IArticle = {}
}
