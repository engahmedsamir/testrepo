import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders: Order[];

  constructor(private orderService: OrderService) {
    this.orderService.getAll().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }
}
