import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  post(order) {
    return this.http.post(this.url + "/api/orders", order);
  }

  getAll() {
    return this.http.get(this.url + "/api/orders");
  }

  getAllByUser(userId) {
    return this.http.get(this.url + "/api/orders/user/" + userId);
  }

  getItems(orderId) {
    return this.http.get(this.url + "/api/orderitems/" + orderId);
  }
}
