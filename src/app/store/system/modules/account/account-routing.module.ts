import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { AddressComponent } from './pages/address/address.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';




const routes: Routes = [
 {path:'', component: AccountComponent, children: [
  {path:'dashboard', component:DashboardComponent},
  {path:'orders', component:OrdersComponent},
  {path:'wishlist', component:WishlistComponent},
  {path:'reviews', component:ReviewsComponent},
  {path:'address', component:AddressComponent},
  {path:'profile', component:ProfileComponent},
  {path:'',  redirectTo:'dashboard', pathMatch:'full'}
 ]
},
{path:'order/:id', component:OrderDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
