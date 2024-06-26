import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryService } from '../../Services/category.service';
import { Category1 } from '../../shared/model/Category1';
import { Language } from '../../shared/model/Language';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GamePlayed } from '../../shared/model/GamePlayed';
import { GameService } from '../../Services/game.service';
import { MixedGameResultComponent } from '../mixed-game-result/mixed-game-result.component';
import { WordResult } from '../word_result/word-result';
import { ScorePointService } from '../../Services/scorePoint.service';
import { TimerComponent } from '../../timer/timer.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-mixed-game',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
    MixedGameResultComponent,
    TimerComponent
  ],
  templateUrl: './mixed-game.component.html',
  styleUrl: './mixed-game.component.css',
})
export class MixedGameComponent implements OnInit {
  currentCategory?: Category1;
  @Input() id?: string;
  wordToShow?: string;
  shuffledString?: string;
  userAnswer: string = '';
  wordsIndex: number = 0;
  progressValue: number = 0;
  gameEnded = false;
  totalCorrectAnswers: number = 0;
  totalWords: number = 0;
  wordResults: WordResult[] = [];
  gameEndMessage: string = '';
  errorMessage: string = '';
  startTime: number = 0;

  constructor(
    private categoryService: CategoryService,
    private gameService: GameService,
    private scorePointService: ScorePointService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.startTime = Date.now();
    await this.initializeGame();
  }

  async initializeGame(): Promise<void> {
    if (this.id) {
      this.currentCategory = await this.categoryService.get(this.id);
      if (this.currentCategory) {
        if (this.currentCategory.words.length >= 6) {
          this.totalWords = this.currentCategory.words.length;
          this.wordsIndex = 0;
          this.updateWord();
        } else {
          this.errorMessage = 'Not enough words in the category. Minimum 6 words are required.';
        }
      }
    }
  }

  shuffleString(input: string): string {
    let characters = input.split('');
    for (let i = characters.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join('');
  }

  formatString(shuffled: string): string {
    return shuffled.toUpperCase().split('').join(' ');
  }

  checkAnswer(): void {
    if (!this.currentCategory || this.wordsIndex >= this.currentCategory.words.length) {
      alert('Game not properly initialized or all words have been guessed.');
      return;
    }

    const currentWord = this.currentCategory.words[this.wordsIndex];
    const isCorrect = this.userAnswer.toLowerCase() === currentWord.origin.toLowerCase();
    this.wordResults.push({
      word: currentWord.origin,
      translation: currentWord.target,
      isCorrect: isCorrect,
    });

    if (isCorrect) {
      this.totalCorrectAnswers++;
    }

    this.wordsIndex++;
    if (this.wordsIndex < this.currentCategory.words.length) {
      this.updateWord();
    } else {
      this.finishGame();
    }

    this.updateProgress();
    this.userAnswer = '';
  }

  updateWord(): void {
    if (this.currentCategory && this.wordsIndex < this.currentCategory.words.length) {
      const word = this.currentCategory.words[this.wordsIndex];
      this.wordToShow = word.target;
      this.shuffledString = this.formatString(this.shuffleString(word.origin));
    }
  }

  updateProgress(): void {
    this.progressValue = (this.wordsIndex / this.totalWords) * 100;
  }

  finishGame(message: string = '', isTimedOut: boolean = false): void {
    this.gameEnded = true;
    this.gameEndMessage = message || 'Game Over';
    const score = this.calculateScore(this.totalCorrectAnswers, this.totalWords);
    const duration = ((Date.now() - this.startTime) / 60000).toFixed(2); // Длительность игры в минутах
    if (this.currentCategory) {
      const gamePlayed = new GamePlayed(
        score.toString(),
        this.currentCategory.id.toString(),
        Math.floor(Math.random() * 10000).toString(),
        duration,
        isTimedOut
      );
      this.scorePointService.addGamePlayed(gamePlayed).then(() => {
        console.log('Game results saved successfully.');
      }).catch((error) => {
        console.error('Error saving game results:', error);
      });
    }
  }

  calculateScore(correctCount: number, totalCount: number): number {
    return Math.floor((correctCount / totalCount) * 100);
  }

  onTimerEnd(): void {
    this.finishGame('Time is up', true);
  }

  restartGame(): void {
    this.gameEnded = false;
    this.totalCorrectAnswers = 0;
    this.wordsIndex = 0;
    this.wordResults = [];
    this.userAnswer = '';
    this.progressValue = 0;
    this.gameEndMessage = '';
    this.errorMessage = '';
    this.startTime = Date.now();
    this.initializeGame();
  }
}


