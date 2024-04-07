

export class GamePlayed {
	categoryId: number;
	gameId: number;
	date= new Date();
	scorePoint: number;
	constructor(scorePoint: number, categoryId: number, gameId: number){
		this.categoryId = categoryId;
		this.gameId = gameId;
		this.scorePoint = scorePoint 
	}
}