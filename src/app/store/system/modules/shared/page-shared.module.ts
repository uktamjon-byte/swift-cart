import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageCardComponent } from './components/blog-page-card/blog-page-card.component';
import { RouterModule } from '@angular/router';
import { CategoriesService } from './services/categories.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ShopService } from './services/shop.service';


@NgModule({
  declarations: [
    BlogPageCardComponent,
    ProductCardComponent
  ],
  imports: [CommonModule,RouterModule],  
  exports: [
    BlogPageCardComponent,
    ProductCardComponent
  ],
  providers:[CategoriesService,ShopService] 
})
export class PageSharedModule { }
