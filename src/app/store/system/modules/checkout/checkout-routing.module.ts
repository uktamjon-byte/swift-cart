import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CartReviewComponent } from './pages/cart-review/cart-review.component';
import { CheckoutProductComponent } from './pages/checkout-product/checkout-product.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';


const routes: Routes = [
   {path:'', component: CheckoutComponent, children: [
        { path: 'cart-view', component: CartReviewComponent },
        { path: 'checkout', component: CheckoutProductComponent },
        { path: 'order-complete', component: OrderCompleteComponent },
        { path: '', redirectTo: 'cart-view', pathMatch:'full' }
   ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }