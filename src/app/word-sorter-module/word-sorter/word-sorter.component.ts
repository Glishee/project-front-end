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
  @Input() id?: string;
  currentCategory: Category1 = new Category1(0, '', Language.English, Language.Hebrew);
  currentWord?: TranslatedWord;
  wordIndex: number = 0;
  correctAnswers: number = 0;
  totalQuestions: number = 0;
  allAnswer: number = 0 
  progressValue: number = 0;
  guesses: { word: string; isCorrect: boolean }[] = [];
  gameEnded = false

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeCategory();
  }

  initializeCategory(): void {
    if (this.id) {
      const categoryId = parseInt(this.id);
      if (!isNaN(categoryId)) {
        const category = this.categoryService.get(categoryId);
        if (category) {
          this.currentCategory = category;
          this.totalQuestions = this.currentCategory.words.length;
          this.prepareNextWord();
        } else {
          console.error(`Category not found with ID ${categoryId}`);
        }
      } else {
        console.error('Invalid category ID:', this.id);
      }
    }
  }

  private selectRandomWords(words: TranslatedWord[], count: number): TranslatedWord[] {
    return words.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  private shuffleWords(words: TranslatedWord[]): TranslatedWord[] {
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words;
  }

  addExtraWords(): void {
    const allCategories = this.categoryService.list(); 
    let allWords: TranslatedWord[] = [];
  
   
    allCategories.forEach(cat => {
      allWords = allWords.concat(cat.words);
    });
  
    if (allWords.length < 6) {
      console.error('Not enough words available to play the game.');
      return; 
    }
  
   
    allWords = this.selectRandomWords(allWords, 6);
  
   
    this.currentCategory.words = allWords;
    this.shuffleWords(this.currentCategory.words);
    this.totalQuestions = this.currentCategory.words.length;
    this.wordIndex = 0;
    this.prepareNextWord();
  }
  

  prepareNextWord(): void {
    if (this.currentCategory && this.wordIndex < this.totalQuestions) {
      this.currentWord = this.currentCategory.words[this.wordIndex];
      this.progressValue = (this.wordIndex / this.totalQuestions) * 100;
      this.wordIndex++;
    } else {
      this.completeGame();
    }
  }

  processAnswer(isCorrect: boolean): void {
    const correctAnswer = this.currentCategory?.words.some(w => w.target === this.currentWord?.target);
    if (isCorrect === correctAnswer) {
      this.correctAnswers++;
      this.correctGuessDialog();
    } else {
      this.incorrectGuessDialog();
    }
    this.prepareNextWord();
  }

  private correctGuessDialog(): void {
    this.dialog.open(WordSorterDialogComponent, {
      data: {
        title: 'Correct!',
        message: 'Nice job! Ready for the next word?',
        buttonText: 'Continue',
        dialogType: 'success'
      },
    });
  }

  private completeGame(): void {
    this.dialog.open(WordSorterDialogComponent, {
      data: {
        title: 'Game Complete!',
        message: `You've finished all words in ${this.currentCategory?.name}.`,
        buttonText: 'See Results',
        dialogType: 'complete'
      },
    });
    this.gameEnded = true
  }

  private incorrectGuessDialog(): void {
    this.dialog.open(WordSorterDialogComponent, {
      data: {
        title: 'Oops!',
        message: 'That was not quite right. Try the next one!',
        buttonText: 'Next',
        dialogType: 'error'
      },
    });
  }

  
}

