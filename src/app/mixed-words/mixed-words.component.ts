import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mixed-words',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './mixed-words.component.html',
  styleUrl: './mixed-words.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedWordsComponent { }
