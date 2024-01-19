import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BrowserModule } from '@angular/platform-browser';
import { WrapComponent } from './wrap/wrap.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TitleComponent,
    AvatarComponent,
    WrapComponent,
    LoaderComponent,
  ],
  exports: [
    TitleComponent,
    AvatarComponent,
    WrapComponent,
    LoaderComponent,
  ]
})
export class UiModule { }
