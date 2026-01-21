import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPostComponent } from './admin-post.component';
import { AdminPostRoutingModule } from './admin-post-routing.module';
import { PostsComponent } from './pages/posts/posts.component';
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
import { PostBlogService } from './service/post.service';
import { TranslateModule } from '@ngx-translate/core';
import { AdminSharedModule } from '../shared/modules/admin-shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/components/shared-module';
import { TagService } from './service/tag.service';
import { PostCommentsComponent } from './pages/post-comments/post-comments.component';
import { PostCommentService } from './service/post-comments.service';
import { EditCommentComponent } from './pages/edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    AdminPostComponent,
    PostsComponent,
    TagsComponent,
    CreatePostComponent,
    CreateTagCategoriesComponent,
    PostCommentsComponent,
    EditCommentComponent,
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
    SharedModule,
  ],
  providers: [PostBlogService, TagService, PostCommentService],
})
export class AdminPostModule {}
