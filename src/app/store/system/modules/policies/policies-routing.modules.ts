import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PoliciesComponent } from './policies.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';
import { FAQComponent } from './pages/faq/faq.component';
import { ReturnPolicyComponent } from './pages/return-policy/return-policy.component';


const routes: Routes = [
 {path:'', component: PoliciesComponent, children: [
  {path: '', component: PrivacyComponent},
  {path: 'terms', component: TermsOfUseComponent},
  {path: 'faq', component: FAQComponent},
  {path: 'return-policy', component: ReturnPolicyComponent},
  {path: 'privacy', component: PrivacyComponent},
 ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
