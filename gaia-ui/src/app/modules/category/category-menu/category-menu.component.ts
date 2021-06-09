import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';
import { Category } from '../../../types';

@Component({
  selector: 'category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss'],
})
export class CategoryMenuComponent implements OnInit {
    @Output()
    change = new EventEmitter();

    categories = Object.keys(Category);

    selectedCategory: Category;

    Category: any;

    ngOnInit(): void {
      this.onSelect(Category.Default);
    }

    onSelect(categorie: Category): void {
      this.selectedCategory = categorie;
      this.change.emit(this.selectedCategory);
    }
}
