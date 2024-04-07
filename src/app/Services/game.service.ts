import { Injectable } from '@angular/core';
import { gameDifficulty } from '../shared/model/GameDifficulty';
import { GameProfile } from '../shared/model/GameProfile';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private allGames: GameProfile[] = [
    new GameProfile(1, 'Matching Game', '', 'matching-game', gameDifficulty.EASY),
    new GameProfile(2, 'Mixed Words', '', 'mixed-words', gameDifficulty.HARD),
  ];

  constructor() {}
  list(): GameProfile[] {
    return this.allGames;
  }
}
