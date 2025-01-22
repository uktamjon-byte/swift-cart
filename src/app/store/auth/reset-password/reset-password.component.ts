import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, finalize, Subscription } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { IReset } from '../interfaces/auth.interface';
import { ResetService } from '../services/reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private notifyMessage:NotifyServiceMessage, 
    private resetService:ResetService
  ) { }


  passwordType:string = 'password';
  resetForm!:FormGroup;
  showBackDrop:boolean = false;
  sub1:Subscription | any;

  ngOnInit() {
    this.resetForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'newpassword': new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
     const resetValue:IReset = this.resetForm.value;
     this.showBackDrop = true;
     console.log('back')
       this.sub1 = this.resetService.getUser(resetValue)
       .pipe(
         catchError((err:any)=>{
           this.notifyMessage.opeSnackBar(
             'Something went wrong, try again later',
              NotifyMessageType.error
           )
           return EMPTY
         }),
         finalize(()=>{
           this.showBackDrop = false;
         })
       ).subscribe((data:IReset)=>{
         if(data.email === resetValue.email){
          // destructuring form data
          //update password
          // call resetPassword function
           // this.resetService.resetUserPassword(data)
           this.notifyMessage.opeSnackBar(
            'Your password has been updated successfully',
             NotifyMessageType.notify
          )
         }else{
           this.notifyMessage.opeSnackBar(
             'The user has not been found by this email address',
              NotifyMessageType.error
           )
         }
       })
   }
 
   ngOnDestroy() {
    this.resetService.destroy$.next(); // Emit a value to complete all Observables
    this.resetService.destroy$.complete(); // Cleanup the destroy$ Subject
  }
}
