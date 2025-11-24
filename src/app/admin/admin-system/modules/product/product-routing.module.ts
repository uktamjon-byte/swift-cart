import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProductCategoriesComponent } from './pages/product-categories/product-categories.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { BrandListComponent } from './pages/brand-list/brand-list.component';
import { CreateBrandComponent } from './pages/create-brand/create-brand.component';
import { ReviewListComponent } from './pages/review-list/review-list.component';
import { EditReviewComponent } from './pages/edit-review/edit-review.component';
import { TagListComponent } from './pages/tag-list/tag-list.component';
import { CreateTagComponent } from './pages/create-tag/create-tag.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ProductComponent, data: { breadcrumb: 'List' } },
  {
    path: 'create',
    component: CreateProductComponent,
    data: { breadcrumb: 'Create' },
  },
  {
    path: 'list/edit/:id',
    component: CreateProductComponent,
    data: { breadcrumb: 'Edit' },
  },
  {
    path: 'categories',
    component: ProductCategoriesComponent,
    data: { breadcrumb: 'Categories' },
  },
  {
    path: 'categories/create',
    component: CreateCategoryComponent,
    data: { breadcrumb: 'Create' },
  },
  {
    path: 'categories/edit/:id',
    component: CreateCategoryComponent,
    data: { breadcrumb: 'Edit' },
  },
  {
    path: 'brand',
    component: BrandListComponent,
    data: { breadcrumb: 'Brand' },
  },
  {
    path: 'brand/create',
    component: CreateBrandComponent,
    data: { breadcrumb: 'Create' },
  },
  {
    path: 'brand/edit/:id',
    component: CreateBrandComponent,
    data: { breadcrumb: 'Edit' },
  },
  {
    path: 'review',
    component: ReviewListComponent,
    data: { breadcrumb: 'Review' },
  },
  {
    path: 'review/edit/:id',
    component: EditReviewComponent,
    data: { breadcrumb: 'Edit' },
  },
  { path: 'tag', component: TagListComponent, data: { breadcrumb: 'Tag' } },
  {
    path: 'tag/create',
    component: CreateTagComponent,
    data: { breadcrumb: 'Create' },
  },
  {
    path: 'tag/edit/:id',
    component: CreateTagComponent,
    data: { breadcrumb: 'Edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductRoutingModule {}
