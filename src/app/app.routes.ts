import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';


export const routes: Routes = [
    { path: 'blog', component: MainComponent},
    { path: '', pathMatch: 'full', redirectTo: 'blog' } 
];
