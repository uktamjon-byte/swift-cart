import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from '../components/file-manager/file-manager.component';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxHtmlEditorModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxTagBoxModule,
} from 'devextreme-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/components/shared-module';

@NgModule({
  declarations: [FileManagerComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    DxHtmlEditorModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxTagBoxModule,
    TranslateModule,
    DropzoneModule,
    MatDialogModule,
    SharedModule,
  ],
  exports: [FileManagerComponent],
})
export class AdminSharedModule {}
