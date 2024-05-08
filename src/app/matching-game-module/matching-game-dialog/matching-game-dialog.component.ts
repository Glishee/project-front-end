import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-matching-game-dialog',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './matching-game-dialog.component.html',
  styleUrl: './matching-game-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingGameDialogComponent { }
