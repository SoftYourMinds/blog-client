import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UiModule } from '../../../shared/ui/ui.module';
import { MaterialModule } from '../../../shared/materials/material.module';
import { IArticle } from '../../../core/interfaces/IArticle';
import { HeaderComponent } from '../../../core/components/header/header.component';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [
    CommonModule,
    UiModule,
    MaterialModule,
    HeaderComponent,
    DatePipe,
  ],
  providers: [
    DatePipe,
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article: IArticle = {}

  constructor(
    private datePipe: DatePipe,
  ){
    console.log(this.article);
    
  }

  get title(): string {
    return this.article.title || ''
  }

  get content(): string {
    return this.article.content || ''
  }

  get image(): string {
    let defaultImage = "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
    return this.article.image_path || defaultImage
  }

  get tags(): string[] {
    return this.article.tags || []
  }

  get category(): string {
    return this.article.category?.name || '';
  }

  get date(): string {
    let date = this.datePipe.transform(this.article.updated_at, 'short');
    return date ? date : '';
  }

  get authorName(): string {
    return this.article.author?.name || '';
  }

  
  get authorEmail(): string {
    return this.article.author?.email || '';
  }


  
}
