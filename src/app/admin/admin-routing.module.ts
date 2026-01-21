import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';

const routes: Routes = [
  { path: 'login', component: AdminAuthComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-system/admin-system.module').then(
        (m) => m.AdminSystemModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
