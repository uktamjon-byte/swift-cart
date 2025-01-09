import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegis} from '../interfaces/auth.interface';
import { RegisService } from '../services/regis.service';
import { NotifyServiceMessage } from 'src/app/shared/enums/notify.service';
import { catchError, EMPTY, finalize, Subscriber, Subscription } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  constructor(
    private regisService:RegisService, 
    private notifyMessage:NotifyServiceMessage,
  ) { }

  passwordType:string = 'password';
  comfirmPasswordType:string = 'password';
  regisForm!:FormGroup;
  showBackDrop:boolean = false;
  sub1:Subscription | any;

  ngOnInit() {
    this.regisForm = new FormGroup({
          'name': new FormControl('', Validators.required),
          'lastname': new FormControl('', Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'phonenumber': new FormControl('', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
          'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
          'comfirmpassword': new FormControl('', [Validators.required, Validators.minLength(6)])
       })
      }

      onSubmit(){
        const regisValue:IRegis = this.regisForm.value;
        this.showBackDrop = true;
        console.log('dsds', regisValue)
        
        this.sub1 = this.regisService.postUser(regisValue)
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
              ).subscribe((data:IRegis)=>{
                if(data){
                   this.notifyMessage.opeSnackBar('You have been registered successfully', NotifyMessageType.notify)
                }else{
                  this.notifyMessage.opeSnackBar('Registration process failed, come back later', NotifyMessageType.error)
                }
              })

      }

      ngOnDestroy() {
        this.regisService.destroy$.next(); // Emit a value to complete all Observables
        this.regisService.destroy$.complete(); // Cleanup the destroy$ Subject
      }

}
