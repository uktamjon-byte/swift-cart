import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full',
    data: { breadcrumb: 'Sales' },
  },
  {
    path: 'order',
    component: OrderListComponent,
    data: { breadcrumb: 'Order' },
  },
  {
    path: 'order/:id',
    component: OrderDetailComponent,
    data: { breadcrumb: 'Edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSalesRoutingModule {}
