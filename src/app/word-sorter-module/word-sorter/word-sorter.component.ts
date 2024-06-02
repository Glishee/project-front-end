import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { Category1 } from '../../shared/model/Category1'
import { CategoryService } from '../../Services/category.service'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatDialog } from '@angular/material/dialog'
import { WordSorterDialogComponent } from '../word-sorter-dialog/word-sorter-dialog.component'
import { WordSorterResultComponent } from '../word-sorter-result/word-sorter-result.component'
import { GamePlayed } from '../../shared/model/GamePlayed'
import { ScorePointService } from '../../Services/scorePoint.service'
import { TimerComponent } from '../../timer/timer.component';

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatProgressBarModule, WordSorterResultComponent, TimerComponent
  ],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css',
})
export class WordSorterComponent implements OnInit {
  currentColor = '';
  currentCategory?: Category1;
  allWords: string[] = []; 
  gameWords: { word: string, isCorrect?: boolean }[] = [];
  wordIndex = 0;
  correctAnswers = 0;
  totalQuestions = 6;
  gameEnded = false;
  WORD_PER_CATEGORY = 6;
  gameEndMessage: string = '';
  errorMessage: string = '';
  startTime: number = 0;

  constructor(
    private categoryService: CategoryService,
    private scorePointService: ScorePointService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.startTime = Date.now();
    await this.initializeGame();
  }

  async initializeGame() {
    await this.selectRandomCategory(); 
    if (this.currentCategory && this.currentCategory.words.length >= this.WORD_PER_CATEGORY) {
      await this.collectAllWords();
      this.selectRandomWords();
    } else {
      this.errorMessage = 'Not enough words in the category. Minimum 6 words are required.';
    }
  }

  async selectRandomCategory() {
    const allCategories = await this.categoryService.list(); 
    if (allCategories.length > 0) {
      const randomIndex = Math.floor(Math.random() * allCategories.length);
      this.currentCategory = allCategories[randomIndex]; 
    } else {
      this.currentCategory = undefined; 
    }
  }

  async collectAllWords() {
    const allCategories = await this.categoryService.list();
    allCategories.forEach(category => {
      this.allWords.push(...category.words.map(word => word.origin));
    });
    this.shuffleArray(this.allWords); 
  }

  selectRandomWords() {
    this.shuffleArray(this.allWords);
    this.gameWords = this.allWords.slice(0, this.WORD_PER_CATEGORY).map(word => ({ word, isCorrect: undefined }));
    this.wordIndex = 0;
  }

  processAnswer(isCorrect: boolean) {
    if (this.wordIndex < this.gameWords.length) {
      const currentWordEntry = this.gameWords[this.wordIndex];
      const isInCategory = this.currentCategory?.words.some(word => word.origin === currentWordEntry.word);

      if (isCorrect === isInCategory) {
        this.correctAnswers++;
        currentWordEntry.isCorrect = true;
        this.openDialog('You answered correctly!', true);
      } else {
        currentWordEntry.isCorrect = false;
        this.openDialog('Your answer was incorrect.', false);
      }

      this.wordIndex++;
      if (this.wordIndex >= this.gameWords.length) {
        this.endGame();
      }
    }
  }

  openDialog(message: string, isCorrect: boolean): void {
    this.dialog.open(WordSorterDialogComponent, {
      width: '250px',
      data: { message: message, isCorrect: isCorrect }
    });
  }

  endGame(message: string = '', isTimedOut: boolean = false): void {
    console.log('Finishing game with message:', message); 
    this.gameEnded = true;
    this.gameEndMessage = message || 'Game Over';
    const duration = ((Date.now() - this.startTime) / 6000).toFixed(2); 
    if (this.currentCategory) {
      const gamePlayed = new GamePlayed(
        this.correctAnswers.toString(), 
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

  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  progressValue() {
    return (this.wordIndex / this.totalQuestions) * 100;
  }

  onTimerEnd(): void {
    console.log('Timer ended'); 
    this.endGame('Time is up');
  }

  calculateScore(correctCount: number, totalCount: number): number {
    return Math.floor((correctCount / totalCount) * 100);
  }

  restartGame(): void {
    this.gameEnded = false;
    this.correctAnswers = 0;
    this.wordIndex = 0;
    this.gameWords = [];
    this.gameEndMessage = '';
    this.errorMessage = '';
    this.initializeGame();
  }
}