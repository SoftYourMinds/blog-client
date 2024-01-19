import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthorComponent } from './author/author.component';


export const routes: Routes = [
    { path: 'blog', component: MainComponent},
    { path: 'blog/:category', component: MainComponent},
    { path: 'blog/author/:id', component: AuthorComponent},
    { path: '', pathMatch: 'full', redirectTo: 'blog' } 
];
