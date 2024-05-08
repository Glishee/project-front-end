import { Injectable } from '@angular/core';
import { Category1 } from '../shared/model/Category1';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories = new Map<number, Category1>();
  nextId = 0;
  private readonly CATEGORY_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';

  constructor() {
    this.loadCategories();
  }

  private getNextId(): number {
    const nextIdString = localStorage.getItem(this.NEXT_ID_KEY);

    return nextIdString ? parseInt(nextIdString) : 0;
  }

  private setNextId(id: number) {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  private setCategory(allCategory: Map<number, Category1>) {
    localStorage.setItem(
      this.CATEGORY_KEY,
      JSON.stringify(Array.from(allCategory.values()))
    );
  }

  private getCategory(): Map<number, Category1> {
    const categoryString = localStorage.getItem(this.CATEGORY_KEY);
    const idToCategory = new Map<number, Category1>();

    if (categoryString) {
      JSON.parse(categoryString).forEach((category: Category1) => {
        Object.setPrototypeOf(category, Category1.prototype);
        idToCategory.set(category.id, category);
      });
    }

    return idToCategory;
  }


  private loadCategories(): void {
    this.setNextId(this.getNextId()); 
  }

  currentName(): string {
    return this.get(this.getNextId() - 1)?.name || '';
  }

  list(): Category1[] {
    return Array.from(this.getCategory().values());
  }

  get(id: number): Category1 | undefined {
    return this.getCategory().get(id);
  }

  delete(id: number): void {
    const categoryMap = this.getCategory();
    if (!categoryMap.delete(id)) {
      throw new Error('Failed to delete category by id: ' + id);
    }
    this.setCategory(categoryMap);
    this.loadCategories();
  }

  update(category: Category1): void {
    const categoryMap = this.getCategory();
    if (!categoryMap.has(category.id)) { 
      throw new Error('Failed to update category by id: ' + category.id);
    }
    categoryMap.set(category.id, category);
    this.setCategory(categoryMap);
  }

  add(newCategoryData: Category1) {
    let nextId = this.getNextId();
    newCategoryData.id = nextId;

    const categories = this.getCategory();
    categories.set(nextId, newCategoryData);
    this.setCategory(categories);

    this.setNextId(++nextId);
  }

  getTranslationFromStorage(origin: string): string | undefined {
    const categories = this.getCategory();
    for (const category of categories.values()) {
      const word = category.words.find((word) => word.origin === origin);
      if (word) {
        return word.target;
      }
    }
    return undefined;
  }

  getWordsByCategory(categoryName: string): string[] {
    const categories = this.getCategory();
    const categoryObject = Array.from(categories.values()).find(
      (cat) => cat.name === categoryName
    );
    return categoryObject ? categoryObject.words.map((word) => word.origin) : [];
  }
  
}
