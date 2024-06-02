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
  @Input() currentCategory!: Category1;
  @Input() correctAnswers!: number;
  @Input() totalQuestions!: number;
  @Input() gameWords!: { word: string, isCorrect?: boolean }[];
  @Input() gameEndMessage!: string;
  @Input() score!: number;

  constructor() { }
}