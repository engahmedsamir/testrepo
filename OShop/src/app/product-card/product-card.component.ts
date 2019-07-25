import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/Item';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ItemService } from '../services/item.service';
import { ShoppingCartItem } from '../models/ShoppingCartItem';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Item;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;
  QTY = 0;

  constructor(private cartService: ShoppingCartService) { }

  async removeFromCart() {
    this.cartService.updateItemQTY(this.product)
      .subscribe((item: ShoppingCartItem) => {
        if (item) {
          item.QTY -= 1;
          this.cartService.updateItem(item.Id, item)
            .subscribe(() => {
              this.updateCart();
              this.cartService.updateCart();
            });
        }
      })
  }

  async addtoCart() {
    await this.cartService.updateItemQTY(this.product)
      .subscribe((item: ShoppingCartItem) => {
        if (item) {
          item.QTY += 1;
          this.cartService.updateItem(item.Id, item)
            .subscribe(() => {
              this.updateCart();
              this.cartService.updateCart();
            });
        } else {
          let cartItem: ShoppingCartItem = {
            Id: 0,
            ItemId: this.product.Id,
            QTY: 1,
            ShoppingCartId: parseInt(this.cartService.getOrCreateCartId())
          }
          this.cartService.postItem(cartItem)
            .subscribe(() => {
              this.updateCart();
              this.cartService.updateCart();
            });
        }
      });
  }

  updateCart() {
    this.cartService.getCart().subscribe((cart: any) => {
      let item = cart.Items.filter(ci => ci.ItemId == this.product.Id)[0];
      this.QTY = item ? item.QTY : 0;
    });
  }

  // getQuantity() {
  //   if (!this.shoppingCart) return 0;
  //   let item = this.shoppingCart.Items.filter(ci => ci.ItemId == this.product.Id)[0];
  //   // console.log(item);
  //   this.QTY = item ? item.QTY : 0;
  // }

  ngOnInit() {
    this.updateCart();
  }
}
