export class GamePlayed {
  categoryId: number;
  gameId: number;
  datePlayedGame: Date;
  scorePoint: number;

  constructor(scorePoint: number, categoryId: number, gameId: number, datePlayedGame: Date = new Date()) {
    this.categoryId = categoryId;
    this.gameId = gameId;
    this.scorePoint = scorePoint;
    this.datePlayedGame = datePlayedGame;
  }
}