import { gameDifficulty } from './GameDifficulty';

export class GameProfile {
	id: number;
	name : string;
	descriptions : string;
	url: string 
	gameDifficult: gameDifficulty;
	constructor(id:number, name:string, descriptions:string, url: string, gameDifficult: gameDifficulty ){
		this.gameDifficult = gameDifficult
		this.id = id
		this.name = name
		this.descriptions = descriptions
		this.url = url
	}
} 