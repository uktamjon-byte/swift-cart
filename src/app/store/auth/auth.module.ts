import { NgModule } from '@angular/core';


import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifyServiceMessage } from 'src/app/shared/enums/notify.service';

import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisService } from './services/regis.service';
import { ResetService } from './services/reset.service';





@NgModule({
  declarations: [
      AuthComponent,
      LoginComponent,
      RegistrationComponent,
      ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    NotifyServiceMessage,
    LoginService, 
    RegisService,
    ResetService
  ]
})
export class AuthModule { }