import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import {MatDividerModule} from '@angular/material/divider';
import { CategoryService } from '../../Services/category.service'
import { Category1 } from '../../shared/model/Category1'
import { Language } from '../../shared/model/Language'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { GamePlayed } from '../../shared/model/GamePlayed'
import { GameService } from '../../Services/game.service'



@Component({
  selector: 'app-mixed-game',
  standalone: true,
  imports: [
    CommonModule,FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, MatProgressBarModule
  ],
  templateUrl: './mixed-game.component.html',
  styleUrl: './mixed-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedGameComponent {
  currentCategory: Category1 = new Category1(
    0,
    '',
    Language.English,
    Language.Hebrew
  );
  @Input() id?: string;
  wordToShow?: string;
  shuffledString?: string;
  userAnswer: string = '';
  wordsIndex: number = 0;
  progressValue: number = 0;
  

  constructor(private categoryService: CategoryService,
    private gameService: GameService) {}

  ngOnInit(): void {
    if (this.id) {
      const serviceCategory = this.
      categoryService.get(parseInt(this.id));
      if (serviceCategory) {
        this.currentCategory = serviceCategory;
      }
    }
  
   
    if (this.currentCategory && this.currentCategory.words.length > 0) {
      this.wordsIndex = 0;  
      this.updateWord();   
    } else {
      this.wordToShow = "No words available";
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
    if (this.userAnswer.toLowerCase() === this.currentCategory.words[this.wordsIndex].origin.toLowerCase()) {
      this.wordsIndex++;
      if (this.wordsIndex < this.currentCategory.words.length) {
        this.updateWord();
        this.updateProgress();  
      } else {
        this.wordToShow = "Congratulations! You've guessed all words.";
        this.shuffledString = ''; 
        this.progressValue = 100; 
      }
    } else {
      alert('Wrong answer. Try again!');
    }
    this.userAnswer = ''; 
  }

  updateWord(): void {
    const word = this.currentCategory.words[this.wordsIndex];
    this.wordToShow = word.target;
    this.shuffledString = this.formatString(this.shuffleString(word.origin));
  }
  updateProgress(): void {
    if (this.currentCategory && this.currentCategory.words.length > 0) {
      this.progressValue = (this.wordsIndex / this.currentCategory.words.length) * 100;
    }
  }

  finishGame(correctCount: number, totalCount: number): void {
    const scorePoint = this.calculateScore(correctCount, totalCount); // 
    const gamePlayed = new GamePlayed(scorePoint, this.currentCategory.id, 2); 
  
    
    this.gameService.saveGameResults(gamePlayed);
  }

  calculateScore(correctCount: number, totalCount: number): number {
    return correctCount * 10;
  }
}

