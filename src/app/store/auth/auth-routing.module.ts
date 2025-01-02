import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    {
      path:'', 
      component:AuthComponent,
      children:[
        {path:'', pathMatch:'full', redirectTo:'login'},
        {path:'login', component:LoginComponent},
        {path:'registration', component:RegistrationComponent},
        {path:'reset', component:ResetPasswordComponent},
      ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }