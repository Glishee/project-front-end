import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpPageComponent { }
