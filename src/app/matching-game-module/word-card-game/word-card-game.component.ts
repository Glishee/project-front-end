import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Category1 } from '../../shared/model/Category1';

@Component({
  selector: 'app-word-card-game',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './word-card-game.component.html',
  styleUrl: './word-card-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordCardGameComponent {
  @Input() currentCategory?: Category1;
}
