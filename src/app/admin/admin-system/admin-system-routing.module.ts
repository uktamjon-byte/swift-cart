import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSystemComponent } from './admin-system.component';
import { skip } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: AdminSystemComponent,
    data: { breadcrumb: 'Home' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../admin-system/modules/dashboard/dashboard.module').then(
            (m) => m.AdminDashboardModule
          ),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('../admin-system/modules/admin-post/admin-post.module').then(
            (m) => m.AdminPostModule
          ),
        data: { breadcrumb: 'Blog' },
      },
      {
        path: 'media',
        loadChildren: () =>
          import('../admin-system/modules/media/media.module').then(
            (m) => m.MediaModule
          ),
        data: { breadcrumb: 'Media' },
      },
      {
        path: 'product',
        loadChildren: () =>
          import('../admin-system/modules/product/product.module').then(
            (m) => m.ProductModule
          ),
        data: { breadcrumb: 'Product' },
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./modules/sales/sale.module').then((m) => m.SaleModule),
        data: { breadcrumb: 'Sales' },
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'tools',
        loadChildren: () =>
          import('./modules/tools/tools.module').then((m) => m.ToolsModule),
        data: { breadcrumb: 'Tools' },
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./modules/pages/pages.module').then((m) => m.PagesModule),
        data: { breadcrumb: 'Pages' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSystemRoutingModule {}
