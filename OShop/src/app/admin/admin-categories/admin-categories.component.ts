import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Category } from 'src/app/models/Category';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {
  categories: Category[];
  filteredCategories: Category[];
  subscription: Subscription;

  constructor(private categoryService: CategoryService) { }

  filter(query: string) {
    this.filteredCategories = (query) ?
      this.categories.filter(p => p.Name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.categories;
  }

  ngOnInit() {
    this.subscription = this.categoryService.getAll()
      .subscribe((categories: Category[]) => this.filteredCategories = this.categories = categories);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
