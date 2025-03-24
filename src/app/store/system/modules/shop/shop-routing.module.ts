import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductContentComponent } from './pages/product-content/product-content.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ComparePageComponent } from './pages/compare-page/compare-page.component';



const routes: Routes = [
 {path:'', component: ShopComponent, children: [
  {path:'', component:ProductContentComponent},
  {path:'compare-page', component:ComparePageComponent},
  {path:':id', component:ProductDetailsComponent}
 ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }