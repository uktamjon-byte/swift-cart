import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPostComponent } from './admin-post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { TagsComponent } from './pages/tags/tags.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateTagCategoriesComponent } from './pages/create-tag-categories/create-tag-categories.component';
import { ComponentMode, PostMode } from './types/enums/post.enum';
import { PostCommentsComponent } from './pages/post-comments/post-comments.component';
import { EditCommentComponent } from './pages/edit-comment/edit-comment.component';
import { PermissionGuard } from 'src/app/admin/admin-auth/guards/permission.guard';
import { permissions } from 'src/app/constants/permissions';

const routes: Routes = [
  {
    path: '',
    component: AdminPostComponent,

    children: [
      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full',
        data: { breadcrumb: 'Post' },
      },
      {
        path: 'post',
        component: PostsComponent,
        canActivate: [PermissionGuard],
        data: { breadcrumb: 'Post', permission: permissions.blogRead },
      },
      {
        path: 'tag',
        canActivate: [PermissionGuard],
        component: TagsComponent,
        data: { breadcrumb: 'Tag', permission: permissions.blogTagRead },
      },
      {
        path: 'post/create',
        component: CreatePostComponent,
        data: {
          mode: PostMode.createPost,
          postCreate: 'Create Post',
          breadcrumb: 'Create',
        },
      },
      {
        path: 'post/comments/:id',
        component: PostCommentsComponent,

        data: {
          breadcrumb: 'Comments',
        },
      },
      {
        path: 'post/comments/edit/:id',
        component: EditCommentComponent,

        data: {
          breadcrumb: 'Comments edit',
        },
      },
      {
        path: 'post/edit/:id',
        component: CreatePostComponent,
        data: {
          mode: PostMode.editPost,
          postEdit: 'Edit Post',
          breadcrumb: 'Edit',
        },
      },
      {
        path: 'tag/create',
        component: CreateTagCategoriesComponent,
        data: {
          mode: ComponentMode.createTag,
          postTagCreate: 'Create Post Tag',
          postTagCreateBtn: 'Create Tag',
          breadcrumb: 'Create',
        },
      },
      {
        path: 'tag/:id',
        component: CreateTagCategoriesComponent,
        data: {
          mode: ComponentMode.editTag,
          postTagEdit: 'Edit Post Tag',
          postTagEditBtn: 'Edit Tag',
          breadcrumb: 'Edit',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPostRoutingModule {}
