import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/Item';
import { take } from 'rxjs/operators';
import { ShoppingCartItem } from '../models/ShoppingCartItem';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnInit {
  url = environment.apiUrl;
  itemCount = 0;
  cart;
  cartItems;
  private _cartItems = new BehaviorSubject<[]>([]);
  cartItem$ = this._cartItems.asObservable();
  cartTotalPrice = 0;
  private _itemCount = new BehaviorSubject<number>(0);
  itemCount$ = this._itemCount.asObservable();

  constructor(private http: HttpClient) {
    this.getCart().subscribe(cartObj => {
      this.cart = cartObj;
    });
    this.updateCart();
  }

  ngOnInit() {

  }

  updateCart() {
    let cart = this.getCart();
    this.itemCount = 0;
    cart.subscribe((cartObj: any) => {
      cart = cartObj;
      for (let itemId in cartObj.Items) {
      }
      this.getAllItems().subscribe(items => {
        this.cartItems = items;
        if (this.cartItems.length == 0) this.cartTotalPrice = 0;
        for (let i of this.cartItems) {
          this.cartTotalPrice += i.TotalPrice;
          this.itemCount += i.QTY;
        }
        this._itemCount.next(this.itemCount);
        this._cartItems.next(this.cartItems);
      });
    })
  }

  getAllItems() {
    let cartId = this.getOrCreateCartId();
    return this.http.get(this.url + "/api/ShoppingCartItems/shoppingcart/" + cartId);
  }

  private create() {
    return this.http.post(this.url + "/api/shoppingcarts", null).toPromise();
  }

  getCart() {
    let cartId = this.getOrCreateCartId();
    return this.http.get(this.url + "/api/shoppingcarts/" + cartId);
  }

  getOrCreateCartId(): string {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    this.create().then((result: any) => {
      localStorage.setItem('cartId', result.Id);
      return result.Id;
    });
  }

  getItem(cartId: string, productId: number) {
    return this.http.get(this.url + "/api/shoppingcarts/" + cartId + "/items/" + productId);
  }

  updateItem(itemId: number, item: ShoppingCartItem) {
    return this.http.put(this.url + "/api/shoppingcartitems/" + itemId, item);
  }

  postItem(item: ShoppingCartItem) {
    return this.http.post(this.url + "/api/shoppingcartitems/", item);
  }

  updateItemQTY(product: Item) {
    let cartId = this.getOrCreateCartId();
    let cartItem$ = this.getItem(cartId, product.Id);
    return cartItem$.pipe(take(1));
  }

  clearCart() {
    let cartId = this.getOrCreateCartId();
    this.http.delete(this.url + "/api/ShoppingCartItems/shoppingcart/" + cartId).subscribe();
    this.updateCart();
  }
}
