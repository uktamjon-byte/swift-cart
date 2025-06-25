import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';


const routes: Routes = [
 {path:'', component: SystemComponent, children: [
  {
    path: '',
    loadChildren: () =>
      import('../system/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('../system/modules/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('../system/modules/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../system/modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('../system/modules/shop/shop.module').then((m) => m.ShopModule),
  },
   {
    path: 'policies',
    loadChildren: () =>
      import('../system/modules/policies/policies.module').then((m) => m.PoliciesModule),
  }
  
 ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
