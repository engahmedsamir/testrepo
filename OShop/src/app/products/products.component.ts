import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { Item } from '../models/Item';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$: Item[] = [];
  filteredProducts: Item[] = [];
  categories$;
  category: number;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService
  ) {
    itemService.getAll().pipe(switchMap((p: Item[]) => {
      this.products$ = p;
      return route.queryParamMap;
    }))
      .subscribe(params => {
        this.category = parseInt(params.get('category'));
        this.filteredProducts = (this.category) ?
          this.products$.filter(p => p.CategoryId == this.category) :
          this.products$;
      });

    this.categories$ = categoryService.getAll();
  }
}