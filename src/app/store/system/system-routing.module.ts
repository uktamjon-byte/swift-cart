import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';


const routes: Routes = [
 {path:'', component: SystemComponent, children: [
  {
    path: 'blog',
    loadChildren: () =>
      import('../system/modules/blog/blog.module').then((m) => m.BlogModule),
  }
 ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
