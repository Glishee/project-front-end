import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {CommonModule, DatePipe} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialog } from '@angular/material/dialog'
import { ChooseGameDialogComponent } from '../choose-game-dialog/choose-game-dialog.component'
import {MatCardModule} from '@angular/material/card';
import { CategoryService } from '../Services/category.service'
import { Category1 } from '../shared/model/Category1'
import { CategoryCardComponent } from "../category-card/category-card.component";


@Component({
    selector: 'app-play-game',
    standalone: true,
    templateUrl: './play-game.component.html',
    styleUrl: './play-game.component.css',
    imports: [MatTableModule, RouterModule, MatIconModule, MatButtonModule, DatePipe, FormsModule, CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCardModule, CategoryCardComponent]
})
export class PlayGameComponent implements OnInit {
  categories: Category1[] = [];

  constructor(private dialog: MatDialog, private categoryService: CategoryService) {
    const storedCategories: string | null = localStorage.getItem('categories');
    if (storedCategories) {
      const categoriesData = JSON.parse(storedCategories);
      this.categories = categoriesData.map((category: any) => category.name);
    }
    
  
  }
  ngOnInit(): void{
    this.categoryService
    .list()
    .then((result: Category1[]) => (this.categories = result));
  }
  chooseGame(c:Category1): void{
    const dialogRef = this.dialog.open(ChooseGameDialogComponent, {data: c.id})
    this.selectedCategory[c.id] = true;
  }
  wasClicked(categoryId: string): boolean {
    return !!this.selectedCategory[categoryId];
  }

  selectedCategory: { [categoryId: string]: boolean } = {};

 
  
}
