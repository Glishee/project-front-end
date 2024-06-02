export class GamePlayed {
  categoryId: string;
  gameId: string;
  datePlayedGame: Date;
  scorePoint: string;
  duration: string; 
  isTimedOut: boolean;

  constructor(scorePoint: string, categoryId: string, gameId: string, duration: string, isTimedOut: boolean, datePlayedGame: Date = new Date()) {
    this.categoryId = categoryId;
    this.gameId = gameId;
    this.scorePoint = scorePoint;
    this.duration = duration;
    this.isTimedOut = isTimedOut;
    this.datePlayedGame = datePlayedGame;
  }
}