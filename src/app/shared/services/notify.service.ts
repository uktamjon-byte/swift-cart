import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { NotifyMessageType } from '../enums/notify.enum';

@Injectable()
export class NotifyServiceMessage {
  private currentSnackBar?: MatSnackBarRef<TextOnlySnackBar>;
  constructor(private snackBar: MatSnackBar) {}

  opeSnackBar(
    message: string,
    type: NotifyMessageType = NotifyMessageType.notify,
    duration: number = 5000,
    action: string = ''
  ) {
    this.currentSnackBar?.dismiss();
    this.snackBar.open(message, action, {
      panelClass: ['custom-snackbar', type],
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
