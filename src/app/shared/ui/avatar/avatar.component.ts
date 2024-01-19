import { Component, Input } from '@angular/core';
import { generateColor } from '../../../core/helpers/generateColor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Input() name: string = "anonym";
  
  public avatarBackground: string = "";

  constructor() {
    this.avatarBackground = this.color;
  }
  
  public get letter(): string {
    return this.name[0];
  }

  private get color(): string {
    return generateColor();
  }
}
