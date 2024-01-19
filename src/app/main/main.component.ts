import { Component } from '@angular/core';
import { ArticleComponent } from './article/article.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ArticleComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
