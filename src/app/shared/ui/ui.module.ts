import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TitleComponent
  ],
  exports: [
    TitleComponent,
  ]
})
export class UiModule { }
