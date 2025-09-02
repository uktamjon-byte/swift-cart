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
  ],
  exports: [FileManagerComponent],
})
export class AdminSharedModule {}
