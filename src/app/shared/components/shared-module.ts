import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangDropdownComponent } from './lang-dropdown/lang-dropdown.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmWindowComponent } from './confirm-window/confirm-window.component';
import { TranslateModule } from '@ngx-translate/core';
import { NotifyServiceMessage } from '../services/notify.service';
import { SaveEditToolbarComponent } from './save-edit-toolbar/save-edit-toolbar.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    LangDropdownComponent,
    PaginationComponent,
    ConfirmWindowComponent,
    SaveEditToolbarComponent,
  ],
  imports: [CommonModule, MatDialogModule, TranslateModule, MatMenuModule],
  exports: [
    LangDropdownComponent,
    PaginationComponent,
    ConfirmWindowComponent,
    TranslateModule,
    SaveEditToolbarComponent,
  ],
  providers: [NotifyServiceMessage],
})
export class SharedModule {}
