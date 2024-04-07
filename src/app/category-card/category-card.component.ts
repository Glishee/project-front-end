import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { Category1 } from '../shared/model/Category1'

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    CommonModule,MatCardModule
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
  @Input()
  currentCategory?: Category1
  @Input() wasClicked: boolean = false;
}
