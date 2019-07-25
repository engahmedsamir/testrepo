import { Component, OnInit } from '@angular/core';
import { Item } from '../models/Item';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  item: Item = {
    Id: 0,
    Name: "",
    CategoryId: 0,
    CategoryName: "",
    Price: 0,
    Description: "",
    ImageUrl: ""
  };
  itemId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ItemService
  ) {

  }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.productService.get(this.itemId).pipe(take(1))
        .subscribe((i: Item) => {
          this.item = i;
        });
    }
  }

}
