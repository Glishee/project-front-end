import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { Category1 } from '../shared/model/Category1'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    CommonModule,MatCardModule, MatIconModule
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
  @Input()
  currentCategory?: Category1
  wasUpdated(): boolean {
    if(this.currentCategory){
    return this.isDateTheLastWeek(this.currentCategory?.date)
    }else{
      return false
    }
  }
  isDateTheLastWeek(date: Date): boolean{
    const date1 = new Date(date)
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7)
  return date1>= oneWeekAgo && date1 <= today
  }
}
