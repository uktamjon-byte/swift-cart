import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';

import { BlogComponent } from './blog.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostCategoriesComponent } from './components/post-categories/post-categories.component';
import { RecentPostsComponent } from './components/recent-posts/recent-posts.component';
import { SearchPostComponent } from './components/search-post/search-post.component';
import { BlogService } from './services/blog.service';
import { SharedModule } from 'src/app/shared/components/shared-module';
import { PageSharedModule } from '../shared/page-shared.module';






@NgModule({
  declarations: [
    BlogComponent,
    AllPostsComponent,
    PostDetailComponent,
    PostCategoriesComponent,
    RecentPostsComponent,
    SearchPostComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    PageSharedModule
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }