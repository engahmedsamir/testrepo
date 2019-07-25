import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Item } from 'src/app/models/Item';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories;
  selectedCategoryName: string;
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
    private itemService: ItemService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getAll()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  save(item) {
    if (this.itemId) {
      this.itemService.update(this.itemId, item)
        .subscribe(() => {
          this.router.navigate(['admin/products']);
        });
    }
    else {
      this.itemService.post(item)
        .subscribe(() => {
          this.router.navigate(['admin/products']);
        });
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.itemService.delete(this.itemId)
      .subscribe(() => {
        this.router.navigate(['admin/products']);
      });
  }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.itemService.get(this.itemId).pipe(take(1))
        .subscribe((i: Item) => {
          this.item = i;
          this.selectedCategoryName = this.item.CategoryName;
        });
    }
  }

  onCategoryChanged(event) {
    this.selectedCategoryName =
      this.categories.filter(c => c.Id == event.target.value)[0].Name;
  }
}
