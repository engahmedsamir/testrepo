import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category: Category = {
    Id: 0,
    Name: "",
    ItemsCount: 0
  }
  categoryId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  save(category) {
    if (this.categoryId) {
      this.categoryService.update(this.categoryId, category)
        .subscribe(() => {
          this.router.navigate(['admin/categories']);
        });
    }
    else {
      this.categoryService.post(category)
        .subscribe(() => {
          this.router.navigate(['admin/categories']);
        });
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this category?')) return;
    this.categoryService.delete(this.categoryId)
      .subscribe(() => {
        this.router.navigate(['admin/categories']);
      }, () => {
        alert('Cannot delete this category');
      });
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.categoryService.get(this.categoryId).pipe(take(1))
        .subscribe((i: Category) => this.category = i);
    }
  }

}
