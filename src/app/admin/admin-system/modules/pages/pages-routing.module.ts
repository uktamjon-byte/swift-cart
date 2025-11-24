import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRequestComponent } from './pages/user-request/user-request.component';
import { FaqComponent } from './pages/faq/faq.component';
import { CreateFaqComponent } from './pages/create-faq/create-faq.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/request',
    pathMatch: 'full',
  },
  {
    path: 'user/request',
    component: UserRequestComponent,
    data: { breadcrumb: 'User Request' },
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { breadcrumb: 'FAQ' },
  },
  {
    path: 'faq/create',
    component: CreateFaqComponent,
    data: { breadcrumb: 'Create' },
  },
  {
    path: 'faq/edit/:id',
    component: CreateFaqComponent,
    data: { breadcrumb: 'Edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {}
