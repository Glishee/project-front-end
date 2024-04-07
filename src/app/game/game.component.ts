import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryService } from '../Services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule, DatePipe } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatTableModule, RouterModule, MatIconModule, MatButtonModule, DatePipe, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  category: string = '';
  words: { origin: string, target: string, correct: boolean }[] = [];
  correctCount: number = 0;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.loadWordsByCategory(this.category);
    });
  }

  loadWordsByCategory(category: string): void {
    const wordsFromService = this.categoryService.getWordsByCategory(category);
    this.words = wordsFromService.map(word => ({ origin: word, target: '', correct: false }));
  }

  checkTranslations(): void {
    this.correctCount = 0;
    this.words.forEach(word => {
      const translationFromStorage = this.categoryService.getTranslationFromStorage(word.origin);
      if (!word.target.trim()) {
        word.correct = false;
      } else {
        word.correct = word.target === translationFromStorage;
        if (word.correct) {
          this.correctCount++;
        }
      }
    });
  }

  translateWords(): void {
    this.words.forEach(word => {
      const translation = this.categoryService.getTranslationFromStorage(word.origin);
      word.target = translation || '';
    });
  }
}