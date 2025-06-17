import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopContentComponent } from './components/top-content/top-content.component';
import { StoreServiceComponent } from './components/store-service/store-service.component';
import { FeaturedCategoriesComponent } from './components/featured-categories/featured-categories.component';
import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PageSharedModule } from '../shared/page-shared.module';
import { SwiperModule } from 'swiper/angular';
// app.module.ts or the specific module
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { PostSectionComponent } from './components/post-section/post-section.component';
import { BlogService } from '../blog/services/blog.service';

SwiperCore.use([Navigation, Pagination, Autoplay]);





@NgModule({
  declarations: [
    TopContentComponent,
    StoreServiceComponent,
    FeaturedCategoriesComponent,
    BannerComponent,
    HomeComponent,
    PostSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PageSharedModule,
    SwiperModule
  ],
  providers:[
    BlogService
  ]
})
export class HomeModule { }
