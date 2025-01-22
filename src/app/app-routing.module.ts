import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
 //{path: '', pathMatch:'full', redirectTo:''},
  {path:'', loadChildren:()=>import('./store/store.module').then((m)=>m.StoreModule)},
  {path:'admin', loadChildren:()=>import('./admin/admin.module').then((m)=>m.AdminModule)},
  {path: '**', loadChildren:()=>import('./not-found/not-found.module').then((m)=>m.NotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
