import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Category1 } from '../../shared/model/Category1'
import { Language } from '../../shared/model/Language'
import { CategoryService } from '../../Services/category.service'
import { MatButtonModule } from '@angular/material/button'
import { GameService } from '../../Services/game.service'
import { ActivatedRoute, Router } from '@angular/router'
import { GamePlayed } from '../../shared/model/GamePlayed'
import { WordResult } from '../word_result/word-result'

@Component({
  selector: 'app-mixed-game-result',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule
  ],
  templateUrl: './mixed-game-result.component.html',
  styleUrl: './mixed-game-result.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedGameResultComponent {
  @Input() currentCategory?: string;
  @Input() totalCorrectAnswers: number = 0;
  @Input() totalWords: number = 0;
  @Input() userAnswer: string = '';
  @Input() wordResults: WordResult[] = [];

  constructor() {}
}
