import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Category1 } from '../../shared/model/Category1'
import { CategoryService } from '../../Services/category.service'
import { Language } from '../../shared/model/Language'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { WordSorterDialogComponent } from '../word-sorter-dialog/word-sorter-dialog.component'
import { TranslatedWord } from '../../shared/model/Translated-Word'
import { WordSorterResultComponent } from '../word-sorter-result/word-sorter-result.component'
import { GamePlayed } from '../../shared/model/GamePlayed'
import { ScorePointService } from '../../Services/scorePoint.service'

@Component({
  selector: 'app-word-sorter',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatProgressBarModule, WordSorterResultComponent
  ],
  templateUrl: './word-sorter.component.html',
  styleUrl: './word-sorter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSorterComponent implements OnInit {
  currentCategory?: Category1;
  allWords: string[] = []; 
  gameWords: { word: string, isCorrect?: boolean }[] = [];
  wordIndex = 0;
  correctAnswers = 0;
  totalQuestions = 6;
  gameEnded = false;
  WORD_PER_CATEGORY = 6;

  constructor(
    private categoryService: CategoryService,
    private scorePointService: ScorePointService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.selectRandomCategory(); 
    this.collectAllWords(); 
    this.selectRandomWords(); // Выбираем слова для игры
  }
 
  selectRandomCategory() {
    const allCategories = this.categoryService.list(); 
    if (allCategories.length > 0) {
        const randomIndex = Math.floor(Math.random() * allCategories.length);
        this.currentCategory = allCategories[randomIndex]; 
    } else {
        this.currentCategory = undefined; 
    }
}
  collectAllWords() {
    const allCategories = this.categoryService.list();
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
    const currentWordEntry = this.gameWords[this.wordIndex];
    const isInCategory = this.currentCategory?.words.some(word => word.origin === currentWordEntry.word);
  
    if (isCorrect === isInCategory) {
      this.correctAnswers++;
      currentWordEntry.isCorrect = true;
      this.openDialog('You answered correctly!');
    } else {
      currentWordEntry.isCorrect = false;
      this.openDialog('Your answer was incorrect.');
    }
  
    this.wordIndex++;
    if (this.wordIndex >= this.gameWords.length) {
      this.endGame();
    }
  }

  openDialog(message: string): void {
    this.dialog.open(WordSorterDialogComponent, {
      width: '250px',
      data: { message: message }
    });
  }


  endGame() {
    this.gameEnded = true;
    if (this.currentCategory) {
      this.scorePointService.addGamePlayed({
        categoryId: this.currentCategory.id,
        gameId: Math.floor(Math.random() * 10000),
        datePlayedGame: new Date(),
        scorePoint: this.correctAnswers
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
}

