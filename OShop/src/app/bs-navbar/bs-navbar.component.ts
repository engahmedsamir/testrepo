import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<Object>;
  itemCount;
  currentUser;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.currentUser$
      .subscribe(currentUser => this.currentUser = currentUser);
    this.cartService.itemCount$
      .subscribe(itemCount => this.itemCount = itemCount);
  }

  onLogout() {
    this.authService.logout();
  }
}
