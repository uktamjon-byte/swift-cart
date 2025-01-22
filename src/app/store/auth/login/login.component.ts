import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, EMPTY, finalize, Subscription } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';

import { ILogin } from '../interfaces/auth.interface';
import { LoginService } from '../services/login.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
declare let google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup;
  passwordType:string = 'password';
  showBackDrop:boolean = false;
  sub1:Subscription | any;
  title:string = 'Login'
  user:any;
  loggedIn:boolean = false;

  @ViewChild('googleButton', { static: true }) googleButton!: ElementRef;

  constructor(
    private notifyMessage:NotifyServiceMessage,
    private loginService:LoginService,
    private translateService:TranslateService,
    private authFacebookService: SocialAuthService
    ) { 
      this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, Validators.minLength(6)])
     });
    }

  ngOnInit() {
    console.log('button', this.googleButton)
    this.authFacebookService.authState.subscribe((user) => {
      if(user){
        this.user = user;
        this.loggedIn = (user != null);
        console.log('user',user)
      }else{
        this.notifyMessage.opeSnackBar('Please login into your account', NotifyMessageType.warning)
      }
     
    });
  }

  

  signInWithFB(): void {
    this.authFacebookService.signIn(FacebookLoginProvider.PROVIDER_ID)
        .then(response => {
            console.log('User logged in successfully:', response);
        })
        .catch(() => {
            console.log('Facebook login popup closed by the user. No action required.');
        });

}



  signInWithGoogle(){
    //this.googleButton.nativeElement.click();
 console.log('clicked')
    this.authFacebookService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(response => {
      console.log('User logged in successfully:', response);
      })
  .catch((e) => {
    console.log('error', e);
      console.log('Facebook login popup closed by the user. No action required.');
  });
 
  }

  

  onSubmit(){
    let login:ILogin = this.loginForm.value;
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
      ).subscribe((data:ILogin)=>{
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

  ngOnDestroy() {
    this.loginService.destroy$.next(); // Emit a value to complete all Observables
    this.loginService.destroy$.complete(); // Cleanup the destroy$ Subject

    this.authFacebookService.signOut();
  }

}

