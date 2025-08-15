import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPostComponent } from './admin-post.component';
import { PostsComponent } from './pages/posts/posts.component';
import { TagsComponent } from './pages/tags/tags.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateTagCategoriesComponent } from './pages/create-tag-categories/create-tag-categories.component';
import { ComponentMode, PostMode } from './types/enums/post.enum';
import { Observable } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: AdminPostComponent,
    children: [
      { path: '', redirectTo: 'post', pathMatch: 'full' },
      { path: 'post', component: PostsComponent },
      { path: 'tag', component: TagsComponent },
      { path: 'category', component: CategoriesComponent },
      {
        path: 'post/create',
        component: CreatePostComponent,
        data: {
          mode: PostMode.createPost,
          postCreate: 'Create Post',
        },
      },
      {
        path: 'post-edit/:id',
        component: CreatePostComponent,
        data: {
          mode: PostMode.editPost,
          postEdit: 'Edit Post',
        },
      },
      {
        path: 'category/create',
        component: CreateTagCategoriesComponent,
        data: {
          mode: ComponentMode.createCategory,
          postCategoryCreate: 'Create Post Category',
          postCategoryCreateBtn: 'Create Category',
        },
      },
      {
        path: 'category/:id',
        component: CreateTagCategoriesComponent,
        data: {
          mode: ComponentMode.editCategory,
          postCategoryEdit: 'Edit Post Category',
          postCategoryEditBtn: 'Edit Category',
        },
      },
      {
        path: 'tag/create',
        component: CreateTagCategoriesComponent,
        data: {
          mode: ComponentMode.createTag,
          postTagCreate: 'Create Post Tag',
          postTagCreateBtn: 'Create Tag',
        },
      },
      {
        path: 'tag/:id',
        component: CreateTagCategoriesComponent,
        data: {
          mode: ComponentMode.editTag,
          postTagEdit: 'Edit Post Tag',
          postTagEditBtn: 'Edit Tag',
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
