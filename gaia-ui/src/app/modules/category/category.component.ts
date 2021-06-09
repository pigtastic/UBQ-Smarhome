/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Category, Group } from '../../types';

@Component({
  selector: 'app-light',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  // Mobile sidenav
  opened = false

  selectedCategory: Category;

  devices: any[];

  loading: boolean;

  groups: Group[] = [];

  constructor(
    public media: MediaObserver,
  ) {
    this.categorySelected(Category.Default);
  }

  // eslint-disable-next-line no-shadow
  categorySelected(category: any) {
    this.selectedCategory = category;
    this.opened = false;
  }
}
