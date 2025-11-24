import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPagesRoutingModule } from './pages-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxButtonModule,
  DxHtmlEditorModule,
} from 'devextreme-angular';
import { UserRequestComponent } from './pages/user-request/user-request.component';
import { FaqComponent } from './pages/faq/faq.component';
import { CreateFaqComponent } from './pages/create-faq/create-faq.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserRequestComponent, FaqComponent, CreateFaqComponent],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    TranslateModule,
    DxButtonModule,
    ReactiveFormsModule,
    DxHtmlEditorModule,
  ],
})
export class PagesModule {}
