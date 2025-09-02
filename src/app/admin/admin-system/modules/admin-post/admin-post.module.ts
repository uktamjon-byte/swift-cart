import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPostComponent } from './admin-post.component';
import { AdminPostRoutingModule } from './admin-post-routing.module';
import { PostsComponent } from './pages/posts/posts.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TagsComponent } from './pages/tags/tags.component';
import {
  DxBulletModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxHtmlEditorModule,
  DxSelectBoxModule,
  DxTagBoxModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateTagCategoriesComponent } from './pages/create-tag-categories/create-tag-categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostBlogService } from './pages/services/post.service';
import { TranslateModule } from '@ngx-translate/core';
import { AdminSharedModule } from '../shared/modules/admin-shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AdminPostComponent,
    PostsComponent,
    CategoriesComponent,
    TagsComponent,
    CreatePostComponent,
    CreateTagCategoriesComponent,
  ],
  imports: [
    CommonModule,
    AdminPostRoutingModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxHtmlEditorModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    ReactiveFormsModule,
    TranslateModule,
    AdminSharedModule,
    MatDialogModule,
  ],
  providers: [PostBlogService],
})
export class AdminPostModule {}
