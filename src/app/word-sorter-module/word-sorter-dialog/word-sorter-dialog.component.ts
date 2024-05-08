import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DialogData } from '../../choose-game-dialog/choose-game-dialog.component'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-word-sorter-dialog',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatDialogModule
  ],
  templateUrl: './word-sorter-dialog.component.html',
  styleUrl: './word-sorter-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSorterDialogComponent { 
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<WordSorterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.message = this.data.message;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

