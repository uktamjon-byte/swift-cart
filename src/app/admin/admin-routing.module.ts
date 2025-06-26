import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';


const routes: Routes = [
  {path:'', component:AdminAuthComponent},
  {path: 'admin-system', loadChildren:()=>import('./admin-system/admin-system.module').then(m=>(m.AdminSystemModule))}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }