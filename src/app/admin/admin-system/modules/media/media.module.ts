import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSharedModule } from '../shared/modules/admin-shared.module';
import { MediaRoutingModule } from './media-routing.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminSharedModule, MediaRoutingModule],
})
export class MediaModule {}
