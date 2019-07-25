import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  items: Item[];
  filteredItems: Item[];
  subscription: Subscription;

  constructor(private itemService: ItemService) { }

  filter(query: string) {
    this.filteredItems = (query) ?
      this.items.filter(p => p.Name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.items;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.itemService.getAll()
      .subscribe((items: Item[]) => this.filteredItems = this.items = items);
  }

}
