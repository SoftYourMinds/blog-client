import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TitleComponent,
    AvatarComponent,
  ],
  exports: [
    TitleComponent,
    AvatarComponent
  ]
})
export class UiModule { }
