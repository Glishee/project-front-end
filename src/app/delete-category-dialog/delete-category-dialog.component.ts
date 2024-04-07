import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-category-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './delete-category-dialog.component.html',
  styleUrl: './delete-category-dialog.component.css',
})
export class DeleteCategoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public name: string) {}
    
}
