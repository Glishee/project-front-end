import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule
  ],
  templateUrl: './Footer.component.html',
  styleUrl: './Footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  
 }
