import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from '../components/file-manager/file-manager.component';

@NgModule({
  declarations: [FileManagerComponent],
  imports: [CommonModule],
  exports: [FileManagerComponent],
})
export class AdminSharedModule {}
