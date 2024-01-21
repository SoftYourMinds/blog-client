import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthorComponent } from './author/author.component';
import { ArticleComponent } from './article/article.component';


export const routes: Routes = [
    { path: 'blog', component: MainComponent},
    { path: 'blog/:category', component: MainComponent},
    { path: 'author', component: AuthorComponent},
    { path: 'article/:id', component: ArticleComponent},
    { path: '', pathMatch: 'full', redirectTo: 'blog' } 
];
