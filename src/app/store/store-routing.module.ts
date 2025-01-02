import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'auth', loadChildren:()=>import('./auth/auth.module').then((m)=>m.AuthModule)},
  {path:'', loadChildren:()=>import('./system/system.module').then((m)=>m.SystemModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }