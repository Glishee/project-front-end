import { Injectable } from '@angular/core';
import { gameDifficulty } from '../shared/model/GameDifficulty';
import { GameProfile } from '../shared/model/GameProfile';
import { GamePlayed } from '../shared/model/GamePlayed'

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private lastGameResult: GamePlayed | null = null;
  private allGames: GameProfile[] = [
    new GameProfile(1, 'Word-Sorter', '', 'word-sorter', gameDifficulty.EASY),
    new GameProfile(2, 'Mixed Words', '', 'mixed-game', gameDifficulty.HARD),
  ];

  constructor() {}
  list(): GameProfile[] {
    return this.allGames;
  }

  saveGameResults(result: GamePlayed): void {
    this.lastGameResult = result;
  }

  getLastGameResult(): GamePlayed | null {
    return this.lastGameResult;
  }
}

