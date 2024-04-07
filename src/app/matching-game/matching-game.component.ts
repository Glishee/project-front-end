import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-matching-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingGameComponent { }
