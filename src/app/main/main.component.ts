import { Component } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { HeaderComponent } from '../core/components/header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ArticleComponent,
    HeaderComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
