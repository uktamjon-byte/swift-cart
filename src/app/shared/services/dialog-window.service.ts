import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from '../components/confirm-window/confirm-window.component';

@Injectable({
  providedIn: 'root'
})
export class DialogWindowService {

  constructor(public dialog: MatDialog) { }

  // openDialog() {
  //   this.dialog.open(ConfirmWindowComponent);
  // }
}
