import { CommonModule } from '@angular/common';
import {Component, Inject, OnInit} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { GameService } from '../Services/game.service'
import { GameProfile } from '../shared/model/GameProfile'
import { Router } from '@angular/router'
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-choose-game-dialog',
  standalone: true,
  imports: [
    CommonModule,MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule
  ],
  templateUrl: './choose-game-dialog.component.html',
  styleUrl: './choose-game-dialog.component.css',
})
export class ChooseGameDialogComponent implements OnInit {
  selectedGame: GameProfile | null = null; 

  constructor(
    public dialogRef: MatDialogRef<ChooseGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public categoryId: number,
    private gameService: GameService,
    private router : Router
  ) {}

  games: GameProfile[] = [];

  ngOnInit(): void {
    this.games = this.gameService.list();
  }


  onSelectGame(game: GameProfile): void {
    this.selectedGame = game; 
  }
  playGame(): void {
    if (this.selectedGame) {
      this.router.navigate([this.selectedGame.url, this.categoryId]);
    }
  }
  
}


