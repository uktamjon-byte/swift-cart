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
  { path: 'list', component: ProductComponent },
  { path: 'create', component: CreateProductComponent },
  { path: 'edit/:id', component: CreateProductComponent },
  { path: 'categories', component: ProductCategoriesComponent },
  { path: 'categories/create', component: CreateCategoryComponent },
  { path: 'categories/edit/:id', component: CreateCategoryComponent },
  { path: 'brand', component: BrandListComponent },
  { path: 'brand/create', component: CreateBrandComponent },
  { path: 'brand/edit/:id', component: CreateBrandComponent },
  { path: 'review', component: ReviewListComponent },
  { path: 'review/edit/:id', component: EditReviewComponent },
  { path: 'tag', component: TagListComponent },
  { path: 'tag/create', component: CreateTagComponent },
  { path: 'tag/edit/:id', component: CreateTagComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductRoutingModule {}
