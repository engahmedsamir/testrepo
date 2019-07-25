import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, NgControl, FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { NoAccessComponent } from './no-access/no-access.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ItemService } from './services/item.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { MyOrderDetailsComponent } from './my-order-details/my-order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    NoAccessComponent,
    ProductFormComponent,
    ProductViewComponent,
    AdminCategoriesComponent,
    CategoryFormComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    MyOrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'my/order-details/:id',
        component: MyOrderDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'product/:id',
        component: ProductViewComponent
      },
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/categories/new',
        component: CategoryFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/categories/:id',
        component: CategoryFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/categories',
        component: AdminCategoriesComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'no-access',
        component: NoAccessComponent
      },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    ItemService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
