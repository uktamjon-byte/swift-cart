import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSalesRoutingModule } from './sale-routing.module';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [OrderDetailComponent, OrderListComponent],
  imports: [
    CommonModule,
    AdminSalesRoutingModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    TranslateModule,
  ],
})
export class SaleModule {}
