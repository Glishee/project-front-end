import { TranslatedWord } from './TranslatedWord';
import { Language } from './Language';

export class Category1 {
  id : number;
  name : string;
  origin : Language;
  target : Language;
  date = new Date();
  words : TranslatedWord[] = [];

  constructor(id: number,
      name : string,
      origin : Language,
      target : Language) {
      this.id = id;
      this.name = name;
      this.origin = origin;
      this.target = target;
  }
}