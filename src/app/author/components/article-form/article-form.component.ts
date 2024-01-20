import { ArticleService } from './../../../core/services/article.service';
import { IArticle } from './../../../core/interfaces/IArticle';
import { AuthorPageService } from './../../services/author-page.service';
import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/materials/material.module';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UiModule } from '../../../shared/ui/ui.module';
import { ICategory } from '../../../core/interfaces/ICategory';
import { CategoryService } from '../../../core/services/category.service';
import { Router } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';

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
    ArticleService,
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent {
  articleForm: FormGroup;
  public isEdit: boolean = false;
  
  public categories: ICategory[];
  public article: IArticle = {};

  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authorPageService: AuthorPageService, 
    private categoryService: CategoryService, 
    private articleService: ArticleService,
    private authorServicee: AuthorService,
    ) {}

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
    this.isLoading = true;
    console.log(this.articleForm.value);
    
    let body = Object.assign(this.articleForm.value, {
      'author_id': this.author_id
    })
    if(this.isEdit) {
      Object.assign(body, {
        'id': this.article.id
      })
      this.updateArticle(body);
    } else {
      this.createArticle(body)
    }
  }

  private createArticle(article: IArticle): void {
    this.articleService.createArticle(article).subscribe({
        next: () => {
          this.isEdit = false;
          this.isLoading = false;
          this.authorPageService.getArticlesByAuthor();
          this.resetArticleForm()
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }

  private updateArticle(article: IArticle) {
    this.articleService.updateArticle(article).subscribe({
        next: () => {
          this.isEdit = false;
          this.isLoading = false;
          this.authorPageService.getArticlesByAuthor();
          this.resetArticleForm()
        },
        error: () => {
          this.isLoading = false;
        }
    })
  }

  public deleteArticle(article_id: any): void {
    this.isLoading = true;
    this.articleService.deleteArticle(article_id).subscribe({
      next: () => {
        this.isEdit = false;
        this.isLoading = false;
        this.authorPageService.getArticlesByAuthor();
        this.resetArticleForm()
      },
      error: () => {
        this.isLoading = false;
      }
    })
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
        image_path: URL.createObjectURL(file)
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
    console.log(this.article.tags)
    this.keywords = this.article.tags || [];
  }

  public toggleIsEdit(): void {
    this.isEdit = !this.isEdit;
  }

  public backToCreateForm(): void {
    this.articleForm.reset();
    this.toggleIsEdit();
  }

  get author_id(): any {
    return this.authorServicee.author.id
  }

  get image_path(): any {
    return this.articleForm.get("image_path")?.value
  }

  private resetArticleForm(): void {
    this.articleForm.reset();
    this.keywords = [];
  }
  
}
