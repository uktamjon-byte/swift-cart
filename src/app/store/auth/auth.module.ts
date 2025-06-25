import { NgModule } from '@angular/core';


import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';

import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { LoginService } from './services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisService } from './services/regis.service';
import { ResetService } from './services/reset.service';
import { LangDropdownComponent } from '../../shared/components/lang-dropdown/lang-dropdown.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
   FacebookLoginProvider,
   GoogleLoginProvider, 
   SocialAuthServiceConfig, 
   SocialLoginModule 
} from '@abacritt/angularx-social-login';
import { SharedModule } from '../../shared/components/shared-module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
      AuthComponent,
      LoginComponent,
      RegistrationComponent,
      ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatMenuModule,
    SharedModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    SocialLoginModule,
     TranslateModule.forChild({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
  ],
  providers: [
    NotifyServiceMessage,
    LoginService, 
    RegisService,
    ResetService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1059047443665-94e61mvfgln721fud7d59q61lamngkpl.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1610692579853334')
          }
        ],
        onError: (err) => {
          console.error('error on module init', err);
        }
      } as SocialAuthServiceConfig,
    }
  ]
})
export class AuthModule { }