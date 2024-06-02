import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentSnapshot,
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { convertorCategory } from '../shared/converter/convertor-category';
import { Category1 } from '../shared/model/Category1';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryCollection: CollectionReference<Category1>;
  private nextId = 0;
  private readonly CATEGORY_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';

  constructor(private firestore: Firestore) {
    this.categoryCollection = collection(
      this.firestore,
      'categories'
    ).withConverter(convertorCategory);
  }

  private getCategories(): Category1[] {
    const categoriesString = localStorage.getItem(this.CATEGORY_KEY);
    return categoriesString
      ? JSON.parse(categoriesString).map((category: Category1) => {
          Object.setPrototypeOf(category, Category1.prototype);
          return category;
        })
      : [];
  }

  async list(): Promise<Category1[]> {
    const querySnapshot = await getDocs(this.categoryCollection);
    const categories: Category1[] = [];
    querySnapshot.forEach((doc: DocumentSnapshot<Category1>) => {
      const data = doc.data();
      if (data) {
        categories.push(data);
      }
    });
    return categories;
  }

  async get(id: string): Promise<Category1 | undefined> {
    const categoryDocRef = doc(this.categoryCollection, id);
    const snapshot = await getDoc(categoryDocRef);
    return snapshot.data();
  }

  async delete(id: string): Promise<void> {
    const categoryDocRef = doc(this.categoryCollection, id);
    await deleteDoc(categoryDocRef);
  }

  async update(category: Category1): Promise<void> {
    const categoryDocRef = doc(this.categoryCollection, category.id);
    await setDoc(categoryDocRef, category);
  }

  async add(category: Category1): Promise<void> {
    await addDoc(this.categoryCollection, category);
  }

  getTranslationFromStorage(origin: string): string | undefined {
    const categories = this.getCategories();
    for (const category of categories) {
      const word = category.words.find((word) => word.origin === origin);
      if (word) {
        return word.target;
      }
    }
    return undefined;
  }

  getWordsByCategory(categoryName: string): string[] {
    const categories = this.getCategories();
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.words.map((word) => word.origin) : [];
  }
}
