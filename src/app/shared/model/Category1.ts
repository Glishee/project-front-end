import { Language } from './Language';
import { TranslatedWord } from './Translated-Word';

export class Category1 {
  constructor( public id: string,
    public name: string,
    public origin: Language,
    public target: Language,
    public date = new Date(),
    public words: TranslatedWord[] = []) {}
}
