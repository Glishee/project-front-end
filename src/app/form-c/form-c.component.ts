import { CommonModule } from '@angular/common'; 
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CategoryService } from '../Services/category.service';
import { Category1 } from '../shared/model/Category1';
import { Language } from '../shared/model/Language';
import { TranslatedWord } from '../shared/model/TranslatedWord';

@Component({
  selector: 'app-form-c',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './form-c.component.html',
  styleUrls: ['./form-c.component.css']
})
export class FormCComponent implements OnInit {
 currentCategory: Category1 = new Category1(0,"",Language.English, Language.Hebrew);
  
  @Input() id?: string;
  
  constructor(private categoryService: CategoryService, private router: Router) {}
  

  ngOnInit():  void {
    if (this.id) {
      let serviceCategory = this.categoryService.get(parseInt(this.id));

      if (serviceCategory) {
        this.currentCategory = serviceCategory;
      }
    }
  }


  
  onSubmitRegistration() {
    console.log('Form submitted!');
    if (this.id) {
      this.categoryService.update(this.currentCategory);
    } else {
      this.categoryService.add(this.currentCategory);
    }
    this.router.navigate(['/']);
  }
  addWord(): void {
    this.currentCategory.words.push(new TranslatedWord('', ''));
  }
  deleteWord(index: number): void {
    this.currentCategory.words.splice(index, 1);
  } 
  }

