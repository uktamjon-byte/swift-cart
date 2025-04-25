import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { NavbarAccountComponent } from './components/navbar-account/navbar-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { AddressComponent } from './pages/address/address.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';



@NgModule({
  declarations: [
    AccountComponent,
    NavbarAccountComponent,
    DashboardComponent,
    OrdersComponent,
    WishlistComponent,
    ReviewsComponent,
    AddressComponent,
    ProfileComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
