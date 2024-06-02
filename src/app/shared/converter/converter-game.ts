import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { GamePlayed } from '../model/GamePlayed';
export const convertorGame: FirestoreDataConverter<GamePlayed> = {
  toFirestore: (game: GamePlayed) => {
    return {
      categoryId: game.categoryId,
      gameId: game.gameId,
      datePlayedGame: game.datePlayedGame
        ? Timestamp.fromDate(game.datePlayedGame)
        : undefined,
      scorePoint: game.scorePoint,
      duration: game.duration,
      isTimedOut: game.isTimedOut,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const game = new GamePlayed(
      data['scorePoint'],
      data['categoryId'],
      data['gameId'],
      data['duration'],
      data['isTimedOut']
    );
    if (data['datePlayedGame']) {
      game.datePlayedGame = data['datePlayedGame'].toDate();
    }
    return game;
  },
};
