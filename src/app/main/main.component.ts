import { Component } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from '../core/components/side-nav/side-nav.component';
import { ArticleService } from '../core/services/article.service';
import { IArticle } from '../core/interfaces/IArticle';
import { UiModule } from '../shared/ui/ui.module';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SearchComponent } from '../core/components/search/search.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ArticleComponent,
    HeaderComponent,
    HttpClientModule,
    SideNavComponent,
    UiModule,
    SearchComponent,
  ],
  providers: [
    ArticleService
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isLoading: boolean = false;
  articles: IArticle[] = [];

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {
    this.isLoading = this.articleService.isArticlesLoading;
  }

  ngOnInit(): void {

    this.articleService.getArticlesAll();

    this.initArticlesObserver();

    this.initGetCategoryByIdObserver();
  }

  public initArticlesObserver(): void {
    this.articleService.$articles.subscribe((articles) => {
      this.articles = articles
    })
  }

  public initGetCategoryByIdObserver(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('category');
      if(id) {
        this.getArticlesByCategory(+id);
      }
    })
  }

    private getArticlesByCategory(category: number) {
      this.isLoading = true;
      this.articleService.findArticlesByCategory(category).subscribe(
        (articles) => {
          this.isLoading = false;
          this.articles = articles;
        }
      )
    }


}
