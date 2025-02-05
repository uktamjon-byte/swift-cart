import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotifyMessageType } from "../enums/notify.enum";

@Injectable()
export class NotifyServiceMessage{
    constructor(private snackBar:MatSnackBar){}

    opeSnackBar( 
        message: string, 
        type: NotifyMessageType = NotifyMessageType.notify,
        duration: number = 5000,
        action: string = ''
    ){
            this.snackBar.open(message, action,{
                panelClass: [type],
                duration: duration,
                horizontalPosition: 'center',
                verticalPosition: 'top',
    
       })
    }
}