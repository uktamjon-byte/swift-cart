import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogWindowButtonType } from '../../enums/notify.enum';

@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.scss']
})
export class ConfirmWindowComponent implements OnInit {

  buttonType:DialogWindowButtonType | any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string; message: string }
  ) {}
  ngOnInit(): void {
    console.log(this.data)
  }

  onOk(): void {
    this.dialogRef.close(DialogWindowButtonType.delete);
  }

  onCancel(): void {
    this.dialogRef.close(DialogWindowButtonType.cancel);
  }


}
