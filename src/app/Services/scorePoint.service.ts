import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { convertorGame } from '../shared/converter/converter-game';
import { GamePlayed } from '../shared/model/GamePlayed';

@Injectable({
  providedIn: 'root',
})
export class ScorePointService {
  gameCollection: CollectionReference<GamePlayed>;

  constructor(private firestore: Firestore) {
    this.gameCollection = collection(
      this.firestore,
      'gamePlayed'
    ).withConverter(convertorGame);
  }

  async list(): Promise<GamePlayed[]> {
    const querySnapshot = await getDocs(this.gameCollection);
    const gamesPlayed: GamePlayed[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot<GamePlayed>) => {
      const data = doc.data();
      if (data) {
        console.log('Game data:', data);
        gamesPlayed.push(data);
      }
    });
    return gamesPlayed;
  }

  async addGamePlayed(newGame: GamePlayed): Promise<void> {
    await addDoc(this.gameCollection, newGame);
  }
}
