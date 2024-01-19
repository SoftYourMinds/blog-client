import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/materials/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiModule } from '../../../shared/ui/ui.module';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorService } from '../../services/author.service';
import { IAuthor } from '../../interfaces/IAuthor';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule, 
    FormsModule,
    UiModule,
    HttpClientModule,
    RouterLink,
  ],
  providers: [
    AuthorService
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService) {}

    ngOnInit(): void {
      console.log(this.author);
      
    }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);
  }

  openSignUpDialog(): void {
    const dialogRef = this.dialog.open(SignUpComponent);
  }

  public get author(): IAuthor {
    return this.authorService.author;
  }

  public get isAuthor(): boolean {
    return localStorage.getItem('author') ? true : false;
  }

  logout() {
    this.authorService.logout();
  }

}
