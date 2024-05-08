import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Category1 } from '../../shared/model/Category1';

@Component({
  selector: 'app-word-card-game-target',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './word-card-game-target.component.html',
  styleUrl: './word-card-game-target.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordCardGameTargetComponent {
  @Input() currentCategory?: Category1;
}
