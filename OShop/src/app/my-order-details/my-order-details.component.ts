import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.css']
})
export class MyOrderDetailsComponent implements OnInit {
  orderItems;
  totalPrice;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let orderId = this.route.snapshot.paramMap.get('id');
    this.orderService.getItems(orderId)
      .subscribe(orderItems => {
        this.orderItems = orderItems;
        this.totalPrice = 0;
        for (let i of this.orderItems) {
          this.totalPrice += i.TotalPrice;
        }
      });
  }

}
