import { Injectable } from '@angular/core';
import { GamePlayed } from '../shared/model/GamePlayed';

@Injectable({
  providedIn: 'root'
})
export class ScorePointService {
  private storageKey = 'gamesPlayed';

  list(): GamePlayed[] {
     const gamesPlayedJson = localStorage.getItem(this.storageKey);
     if (gamesPlayedJson) {
      return JSON.parse(gamesPlayedJson);
    }
    return [];
  }
  addGamePlayed(newGame: GamePlayed) {
    const games = this.list();
    games.push(newGame);
    localStorage.setItem(this.storageKey, JSON.stringify(games));
  }
}
