import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../Services/category.service';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { Category1 } from '../shared/model/Category1';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.list();
  }

  displayedColumns: string[] = ['name', 'Words', 'Date', 'actions'];
  categories: Category1[] = [];


  deleteCategory(id: number, name: string) {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      data: name,
    });

    dialogRef.afterClosed().subscribe((deletionConfirmed) => {
      if (deletionConfirmed) {
        this.categoryService.delete(id);
        this.categories = this.categoryService.list();
      }
    });
  }
  getCategoryWords(category: Category1): string {
    return category.words.map(word => `${word.origin} - ${word.target}`).join(', ');
  }
}
