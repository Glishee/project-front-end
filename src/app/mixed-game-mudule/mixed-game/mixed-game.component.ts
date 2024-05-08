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
import { MixedGameResultComponent } from '../mixed-game-result/mixed-game-result.component';
import { WordResult } from '../word_result/word-result'



@Component({
  selector: 'app-mixed-game',
  standalone: true,
  imports: [
    CommonModule,FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, MatProgressBarModule, MixedGameResultComponent
  ],
  templateUrl: './mixed-game.component.html',
  styleUrl: './mixed-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedGameComponent {
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
  

  constructor(private categoryService: CategoryService,
    private gameService: GameService) {}

    ngOnInit(): void {
      if (this.id) {
        const serviceCategory = this.categoryService.get(parseInt(this.id));
        if (serviceCategory) {
          this.currentCategory = serviceCategory;
          this.totalWords = this.currentCategory.words.length;
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
    if (!this.currentCategory || this.wordsIndex >= this.currentCategory.words.length) {
      alert("Game not properly initialized or all words have been guessed.");
      return;
    }

    const currentWord = this.currentCategory.words[this.wordsIndex];
    const isCorrect = this.userAnswer.toLowerCase() === currentWord.origin.toLowerCase();
    this.wordResults.push({
      word: currentWord.origin,
      translation: currentWord.target,
      isCorrect: isCorrect
    });

    if (isCorrect) {
      this.totalCorrectAnswers++;
      this.wordsIndex++;
      if (this.wordsIndex < this.currentCategory.words.length) {
        this.updateWord();
        this.updateProgress();
      } else {
        this.finishGame();
      }
    } else {
      alert('Wrong answer.');
      
    }
    this.userAnswer = ''; 
  }
  

  updateWord(): void {
    if (this.currentCategory && this.wordsIndex < this.currentCategory.words.length) {
      const word = this.currentCategory.words[this.wordsIndex];
      this.wordToShow = word.target;
      this.shuffledString = this.shuffleString(word.origin);
    }
  }
  
  updateProgress(): void {
    this.progressValue = (this.wordsIndex / this.totalWords) * 100;
  }

  finishGame(): void {
    this.gameEnded = true;
   
  }
  saveGameResults(gamePlayed: GamePlayed): void {
    let games = this.listGames();
    games.push(gamePlayed);
    localStorage.setItem('gamesPlayed', JSON.stringify(games));
  }

listGames(): GamePlayed[] {
  const gamesPlayedJson = localStorage.getItem('gamesPlayed');
  if (gamesPlayedJson) {
    return JSON.parse(gamesPlayedJson);
  }
  return [];
}

calculateScore(correctCount: number, totalCount: number): number {
  return Math.floor((correctCount / totalCount) * 100); 
}
}

