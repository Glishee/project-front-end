import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule, MatIconModule, RouterLink
  ],
  templateUrl: './Footer.component.html',
  styleUrl: './Footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  
 }
