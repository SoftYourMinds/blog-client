import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/materials/material.module';
import { UiModule } from '../../../shared/ui/ui.module';
import { AuthorService } from '../../services/author.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MaterialModule,
    UiModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    AuthorService
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  userForm: FormGroup;
  isLoading: boolean = false;
  hide: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SignUpComponent>,
    private authorService: AuthorService,
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  close() {
    this.dialogRef.close()
  }

  onSubmit() {
    this.isLoading = true;
    this.authorService.signup(this.userForm.value).subscribe({
      next: (author) => {
        this.dialogRef.close()
        this.isLoading = false;
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
