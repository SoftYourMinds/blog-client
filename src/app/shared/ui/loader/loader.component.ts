import { Component } from '@angular/core';
import { MaterialModule } from '../../materials/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
