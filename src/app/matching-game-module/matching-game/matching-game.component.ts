import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category1 } from '../../shared/model/Category1'
import { CategoryService } from '../../Services/category.service'
import { WordCardGameComponent } from '../word-card-game/word-card-game.component';
import { WordCardGameTargetComponent } from '../word-card-game-target/word-card-game-target.component'
import { Language } from '../../shared/model/Language'

@Component({
  selector: 'app-matching-game',
  standalone: true,
  imports: [
    CommonModule, WordCardGameComponent, WordCardGameTargetComponent
  ],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchingGameComponent {
  currentCategory: Category1 = new Category1(
    0,
    '',
    Language.English,
    Language.Hebrew
  );

  @Input() id?: string;

  constructor(
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    if (this.id) {
      const serviceCategory = this.categoryService.get(parseInt(this.id));

      if (serviceCategory) {
        this.currentCategory = serviceCategory;

        //check word >= 6
        //choose random 6 words - TraslatedWord[] - english
        //string[] - hebrew
        // random on hebrew
        // Status[] hebrew - all Normal
        // Status[] english - all normal
      }
    } 

    
  }


 
}