import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSystemComponent } from './admin-system.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSystemComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../admin-system/modules/dashboard/dashboard.module').then(
            (m) => m.AdminDashboardModule
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
