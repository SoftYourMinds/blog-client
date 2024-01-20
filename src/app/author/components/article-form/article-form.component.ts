import { IArticle } from './../../../core/interfaces/IArticle';
import { AuthorPageService } from './../../services/author-page.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/materials/material.module';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UiModule } from '../../../shared/ui/ui.module';
import { ICategory } from '../../../core/interfaces/ICategory';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
  ],
  providers: [
    // AuthorPageService,
    CategoryService,
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent {
  articleForm: FormGroup;
  public isEdit: boolean = false;
  
  public categories: ICategory[];
  private article: IArticle = {};

  public isLoading: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private authorPageService: AuthorPageService, 
    private categoryService: CategoryService, 
    private cd: ChangeDetectorRef
  ) {
    // this.authorPageService.onArticleChange().subscribe(
    //   ()=> console.log("change"));
  }

  ngOnInit(): void {
    this.initArticleForm();
    this.initCategories();
    this.initArticleObserver();
   
  
  }

  private initArticleForm(): void {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category_id: ['', Validators.required],
      tags: [this.keywords], // An array for multiple tags
      image_path: [''] // You can customize this for handling image uploads
    });
  }

  private initCategories(): void {
      this.isLoading = true;
      this.categoryService.getCategoriesAll().subscribe(
        (categories) => {
          this.categories = categories;
          this.isLoading = false;
        }
      )
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.articleForm.value);
  }

  public keywords = ['angular', 'laravel'];

  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.articleForm.patchValue({
        image: URL.createObjectURL(file)
      });
    }
  }

  private initArticleObserver() {
    this.authorPageService._articleFormSubject.subscribe(
      (article) => {
        console.log(article);
        this.isEdit = true;
        this.article = article;
        this.updateArticleFormValues(article)
      }
    )
    this.isEdit = false;
  }

  private updateArticleFormValues(article: IArticle): void {
   
    this.articleForm.patchValue(article)
    this.keywords = this.article.tags || [];
  }

  public toggleIsEdit(): void {
    this.isEdit = !this.isEdit;
  }

  public backToCreateForm(): void {
    this.articleForm.reset();
    this.toggleIsEdit();
  }

  // get title(): string {
  //   return this.article.title || ''; 
  // }

  // get content(): string {
  //   return this.article.content || '';
  // }

  // get image(): string {
  //   return this.article.image_path || '';
  // }

  // get category(): string {
  //   return this.article.category_id+"" || "";
  // }

  // get tags(): string[] {
  //   this.keywords = this.article.tags || [];
  //   return this.article.tags || [];
  // }



  
}
