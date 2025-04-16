import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangDropdownComponent } from './lang-dropdown/lang-dropdown.component';
import { PaginationComponent } from './pagination/pagination.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmWindowComponent } from './confirm-window/confirm-window.component';


@NgModule({
  declarations: [
    LangDropdownComponent,
    PaginationComponent,
    ConfirmWindowComponent
  ], // Declare the component here
  imports: [CommonModule, MatDialogModule],           // Import CommonModule for Angular directives (ngIf, ngFor, etc.)
  exports: [
    LangDropdownComponent,
    PaginationComponent,
    ConfirmWindowComponent
  ]       // Export the component to make it reusable
})
export class SharedModule { }
