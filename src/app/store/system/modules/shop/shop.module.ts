import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { ProductHeaderFilterComponent } from './components/product-header-filter/product-header-filter.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ResponsiveSidebarFiltersComponent } from './components/responsive-sidebar-filters/responsive-sidebar-filters.component';
import { ProductContentComponent } from './pages/product-content/product-content.component';
import { CategoriesService } from '../shared/services/categories.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopService } from './services/shop.service';
import { PageSharedModule } from "../shared/page-shared.module";
import { SharedModule } from 'src/app/shared/components/shared-module';
import { BlogService } from '../blog/services/blog.service';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductRateDetailComponent } from './components/product-rate-detail/product-rate-detail.component';
import { ComparePageComponent } from './pages/compare-page/compare-page.component';



@NgModule({
  declarations: [
    ShopComponent,
    ProductCategoriesComponent,
    ProductFiltersComponent,
    ProductHeaderFilterComponent,
    ProductDetailsComponent,
    ResponsiveSidebarFiltersComponent,
    ProductContentComponent,
    ImageGalleryComponent,
    ProductRateDetailComponent,
    ComparePageComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    PageSharedModule,
    SharedModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
],
  providers:[
    CategoriesService,
    ShopService,
    BlogService
  ]
})
export class ShopModule { }
