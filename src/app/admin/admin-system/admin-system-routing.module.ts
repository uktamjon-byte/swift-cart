import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSystemComponent } from './admin-system.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSystemComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../admin-system/modules/dashboard/dashboard.module').then(
            (m) => m.AdminDashboardModule
          ),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('../admin-system/modules/admin-post/admin-post.module').then(
            (m) => m.AdminPostModule
          ),
      },
      {
        path: 'media',
        loadChildren: () =>
          import('../admin-system/modules/media/media.module').then(
            (m) => m.MediaModule
          ),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('../admin-system/modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSystemRoutingModule {}
