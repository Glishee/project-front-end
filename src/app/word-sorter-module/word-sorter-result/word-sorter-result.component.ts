import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Category1 } from '../../shared/model/Category1';
import { Language } from '../../shared/model/Language';
import { TranslatedWord } from '../../shared/model/Translated-Word'
import { CategoryService } from '../../Services/category.service'

@Component({
  selector: 'app-word-sorter-result',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './word-sorter-result.component.html',
  styleUrl: './word-sorter-result.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSorterResultComponent {
  @Input() currentCategory: Category1 = new Category1(0, '', Language.English, Language.Hebrew);
  @Input() currentWord: TranslatedWord[] = [];
  @Input() correctAnswers: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() allAnswer: number = 0 
  @Input() guesses: { index: number; guess: string; isCorrect: boolean }[] = [];
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  wasCorrectGuess(index: number): boolean {
    const foundGuess = this.guesses.find((g) => g.index === index);
    return foundGuess ? foundGuess.isCorrect : false;
  }

}
