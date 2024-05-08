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
    new GameProfile(1, 'Word-Sorter', 'Mixed Game is an exciting word puzzle game that tests players ability to recognize and rearrange scrambled letters to form correct words. Aimed at improving vocabulary and cognitive skills, players must solve each puzzle by unscrambling letters to match the target word. This game is ideal for language enthusiasts and those seeking to sharpen their linguistic abilities in a dynamic and entertaining format.', 'word-sorter', gameDifficulty.EASY),
    new GameProfile(2, 'Mixed Words', 'Word Sorter is an engaging educational game that challenges players to enhance their vocabulary and word classification skills. In the game, players must decide whether a displayed word belongs to a specific category, testing their language comprehension and quick thinking abilities. This game is perfect for learners of all ages looking to improve their linguistic skills in a fun and interactive way.', 'mixed-game', gameDifficulty.HARD),
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

