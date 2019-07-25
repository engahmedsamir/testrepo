import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  shipping: any = {};

  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService
  ) { }

  placeOrder() {
    let order: any = {};
    this.authService.currentUser$
      .subscribe((currentUser: any) => order.UserId = currentUser.id);
    // order.UserId = this.authService.currentUser.id;
    order.TotalPrice = this.cartService.cartTotalPrice;
    order.CustomerName = this.shipping.name;
    order.Address = this.shipping.addressLine;
    order.City = this.shipping.city;
    order.OrderItem = [];
    let i = 0;
    this.cartService.cartItem$
      .subscribe((cartItems: any) => {
        for (let item of cartItems) {
          let orderItem: any = {
            ItemId: item.ItemId,
            QTY: item.QTY,
            UnitPrice: item.ItemPrice
          }
          order.OrderItem.push(orderItem);
        }
      });
    this.orderService.post(order)
      .subscribe(orderId => {
        this.cartService.clearCart();
        this.router.navigate(['order-success', orderId]);
      });
  }
}
