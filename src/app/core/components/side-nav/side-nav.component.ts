import { CategoryService } from './../../services/category.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materials/material.module';
import { UiModule } from '../../../shared/ui/ui.module';
import { AuthorService } from '../../services/author.service';
import { ICategory } from '../../interfaces/ICategory';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    UiModule,
    RouterLinkActive,
    RouterLink,
  ],
  providers: [
    AuthorService,
    CategoryService,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  categories: ICategory[] = [];
  isLoading: boolean = false;

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit(): void {
     this.getCategoriesAll();
  }

  getCategoriesAll() {
    this.isLoading = true;
    this.categoryService.getCategoriesAll().subscribe(
      (categories) => {
        this.categories = categories;
        this.isLoading = false;
      }
    )
  }




}
