import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { Category1 } from '../model/Category1';
import { TranslatedWord } from '../model/Translated-Word';

export const convertorCategory = {
  toFirestore: (category: Category1) => {
    const words = [];

    for (let i = 0; i < category.words.length; ++i) {
      words.push({
        origin: category.words[i].origin,
        target: category.words[i].target,
      });
    }
    return {
      name: category.name,
      origin: category.origin,
      target: category.target,
      date: Timestamp.fromDate(category.date),
      words: words,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const words = data['words'];
    const category = new Category1(
      snapshot.id,
      data['name'],
      data['origin'],
      data['target'],
      data['date']
    );
    if (data['date']) {
      category.date = data['date'].toDate();
    }
    if (words) {
      for (let i = 0; i < words.length; ++i) {
        category.words.push(
          new TranslatedWord(words[i].origin, words[i].target)
        );
      }
    }
    return category;
  },
};
