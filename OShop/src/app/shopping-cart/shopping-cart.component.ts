import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  itemCount;
  cartItems;
  cartTotalPrice;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.cartService.itemCount$
      .subscribe(itemCount => this.itemCount = itemCount);
    this.cartService.cartItem$
      .subscribe(cartItems => {
        this.cartItems = cartItems;
        this.cartTotalPrice = 0;
        for (let i of this.cartItems) {
          this.cartTotalPrice += i.TotalPrice;
        }
      });
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartService.updateCart();
  }
}
