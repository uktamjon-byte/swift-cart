import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesComponent } from './policies.component';
import { FAQComponent } from './pages/faq/faq.component';
import { ReturnPolicyComponent } from './pages/return-policy/return-policy.component';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { PoliciesRoutingModule } from './policies-routing.modules';



@NgModule({
  declarations: [
    PoliciesComponent,
    FAQComponent,
    ReturnPolicyComponent,
    TermsOfUseComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    PoliciesRoutingModule
  ]
})
export class PoliciesModule { }
