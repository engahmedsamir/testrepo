import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    let userId = 0;
    this.authService.currentUser$
      .subscribe((currentUser: any) => userId = currentUser.id);
    orderService.getAllByUser(userId).subscribe(orders => {
      this.orders = orders;
    })
  }
}
