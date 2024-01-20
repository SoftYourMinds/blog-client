import { Component } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from '../core/components/side-nav/side-nav.component';
import { ArticleService } from '../core/services/article.service';
import { IArticle } from '../core/interfaces/IArticle';
import { UiModule } from '../shared/ui/ui.module';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ArticleComponent,
    HeaderComponent,
    HttpClientModule,
    SideNavComponent,
    UiModule,
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

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getArticlesAll();

    this.articleService.$articles.subscribe((articles) => {
      this.articles = articles
    })

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('category');
      console.log(id)
      if(id) {
        this.getArticlesByCategory(+id);
      }
    })
  }

  private getArticlesAll() {
    this.isLoading= true;
    this.articleService.getArticlesAll().subscribe((articles) => {
      this.articles = articles;
      this.isLoading = false;
    })
  }

  // public get articles(): IArticle[] {
  //   return this.articleService.articles;
  // }

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
