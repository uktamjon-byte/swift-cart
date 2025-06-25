import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';

import { BlogComponent } from './blog.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostCategoriesComponent } from './components/post-categories/post-categories.component';
import { RecentPostsComponent } from './components/recent-posts/recent-posts.component';
import { SearchPostComponent } from './components/search-post/search-post.component';
import { BlogService } from './services/blog.service';
import { SharedModule } from 'src/app/shared/components/shared-module';
import { PageSharedModule } from '../shared/page-shared.module';
import { TranslateModule} from '@ngx-translate/core';






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
    PageSharedModule,
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }