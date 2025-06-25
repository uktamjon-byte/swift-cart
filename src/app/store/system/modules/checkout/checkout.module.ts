import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutProductComponent } from './pages/checkout-product/checkout-product.component';
import { CartReviewComponent } from './pages/cart-review/cart-review.component';
import { RouterModule } from '@angular/router';
import { EmptyCartComponent } from './pages/empty-cart/empty-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule,  } from 'ngx-mask';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutProductComponent,
    CartReviewComponent,
    EmptyCartComponent,
    OrderCompleteComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    MatDialogModule,
    TranslateModule
  ],
  providers:[]
})
export class CheckoutModule { }

