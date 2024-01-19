import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materials/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiModule } from '../../../shared/ui/ui.module';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthorService } from '../../services/author.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    AuthorService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent { 
  userForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private authorService: AuthorService,
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  close() {
    this.dialogRef.close()
  }

  onSubmit() {
    this.isLoading = true;
    this.authorService.login(this.userForm.value).subscribe({
      next: (author) => {
        localStorage.setItem('author', JSON.stringify(author));
        this.isLoading = false;
        this.dialogRef.close()
      },
      error: (error) => {
        this.isLoading = false; 
        console.log("Login", error.message);
        this.userForm.reset();
      }
    })
    console.log(this.userForm.value);
  }



  
}
