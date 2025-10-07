import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { AdminProductRoutingModule } from './product-routing.module';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProductCategoriesComponent } from './pages/product-categories/product-categories.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  DxBulletModule,
  DxDataGridModule,
  DxHtmlEditorModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductService } from './services/product.service';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/components/shared-module';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { BrandListComponent } from './pages/brand-list/brand-list.component';
import { CreateBrandComponent } from './pages/create-brand/create-brand.component';
import { ReviewListComponent } from './pages/review-list/review-list.component';
import { EditReviewComponent } from './pages/edit-review/edit-review.component';
import { TagListComponent } from './pages/tag-list/tag-list.component';
import { CreateTagComponent } from './pages/create-tag/create-tag.component';

@NgModule({
  declarations: [
    ProductComponent,
    CreateProductComponent,
    ProductCategoriesComponent,
    CreateCategoryComponent,
    BrandListComponent,
    CreateBrandComponent,
    ReviewListComponent,
    EditReviewComponent,
    TagListComponent,
    CreateTagComponent,
  ],
  imports: [
    CommonModule,
    AdminProductRoutingModule,
    TranslateModule,
    DxHtmlEditorModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [ProductService],
})
export class ProductModule {}
