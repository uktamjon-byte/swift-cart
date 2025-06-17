import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageCardComponent } from './components/blog-page-card/blog-page-card.component';
import { RouterModule } from '@angular/router';
import { CategoriesService } from './services/categories.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ShopService } from './services/shop.service';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';
import { AddedProductsSidebarComponent } from '../shop/components/added-products-sidebar/added-products-sidebar.component';



@NgModule({
  declarations: [
    BlogPageCardComponent,
    ProductCardComponent,
    ProductCategoriesComponent,
    AddedProductsSidebarComponent
  ],
  imports: [CommonModule,RouterModule],  
  exports: [
    BlogPageCardComponent,
    ProductCardComponent,
    ProductCategoriesComponent,
    AddedProductsSidebarComponent
  ],
  providers:[CategoriesService,ShopService] 
})
export class PageSharedModule { }
