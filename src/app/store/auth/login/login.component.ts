import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { NotifyServiceMessage } from 'src/app/shared/enums/notify.service';
import { LoginService } from '../services/login.service';
import { Login } from '../models/auth.model';
import { catchError, EMPTY, finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private notifyMessage:NotifyServiceMessage, private loginService:LoginService) { }

  loginForm:FormGroup | any;
  passwordType:string = 'password';
  showBackDrop:boolean = false;
  sub1:Subscription | any;

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
   })
  }

  onSubmit(){
    let login:Login = this.loginForm.value;
    this.showBackDrop = true;
    console.log('logvalu', login)
      this.sub1 = this.loginService.getUserByEmail(login.email)
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
      ).subscribe((data:Login)=>{
        if(data){
           if(login.possword === data.possword){
            this.notifyMessage.opeSnackBar(
              'You logged in successfully',
               NotifyMessageType.notify
              )
           }else{
            this.notifyMessage.opeSnackBar(
              'Password is not correct, Please make sure to enter your valid password',
               NotifyMessageType.error
              )
           }
        }else{
          this.notifyMessage.opeSnackBar(
            'The user has not been found by this name',
             NotifyMessageType.error
          )
        }
      })
  }

  ngOnDestroy(){
    if(this.sub1){
     this.sub1.unsubscribe();
    }
   }

}
