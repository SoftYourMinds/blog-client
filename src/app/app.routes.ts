import { Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';

export const routes: Routes = [
    { path: 'blog', component: CoreComponent},
    { path: '', pathMatch: 'full', redirectTo: 'blog' } 
];



