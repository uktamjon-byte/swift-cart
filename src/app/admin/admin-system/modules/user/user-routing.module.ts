import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { PermissionListComponent } from './pages/permission-list/permission-list.component';
import { CreatePermissionComponent } from './pages/create-permission/create-permission.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { CreateRoleComponent } from './pages/create-role/create-role.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'User' },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: UserListComponent,
      },
      {
        path: 'list/create',
        component: CreateUserComponent,
        data: { breadcrumb: 'Create' },
      },
      {
        path: 'list/edit/:id',
        component: CreateUserComponent,
        data: { breadcrumb: 'Edit' },
      },
    ],
  },
  {
    path: 'permissions',
    data: { breadcrumb: 'Permissions', resetBreadcrumb: true },
    children: [
      { path: '', component: PermissionListComponent },
      {
        path: 'create',
        component: CreatePermissionComponent,
        data: { breadcrumb: 'Create' },
      },
      {
        path: 'edit/:id',
        component: CreatePermissionComponent,
        data: { breadcrumb: 'Edit' },
      },
    ],
  },
  {
    path: 'roles',
    data: { breadcrumb: 'Roles', resetBreadcrumb: true },
    children: [
      { path: '', component: RoleListComponent },
      {
        path: 'create',
        component: CreateRoleComponent,
        data: { breadcrumb: 'Create' },
      },
      {
        path: 'edit/:id',
        component: CreateRoleComponent,
        data: { breadcrumb: 'Edit' },
      },
    ],
  },
  // {
  //   path: '',
  //   redirectTo: 'list',
  //   pathMatch: 'full',
  //   data: { breadcrumb: 'User' },
  // },
  // { path: 'list', component: UserListComponent, data: { breadcrumb: 'List' } },
  // {
  //   path: 'create',
  //   component: CreateUserComponent,
  //   data: { breadcrumb: 'Create' },
  // },
  // {
  //   path: 'list/edit/:id',
  //   component: CreateUserComponent,
  //   data: { breadcrumb: 'Edit' },
  // },
  // {
  //   path: 'permissions',
  //   component: PermissionListComponent,
  //   data: { breadcrumb: 'Permissions' },
  // },
  // {
  //   path: 'permissions/create',
  //   component: CreatePermissionComponent,
  //   data: { breadcrumb: 'Create' },
  // },
  // {
  //   path: 'permissions/edit/:id',
  //   component: CreatePermissionComponent,
  //   data: { breadcrumb: 'Edit' },
  // },
  // {
  //   path: 'roles',
  //   component: RoleListComponent,
  //   data: { breadcrumb: 'Roles' },
  // },
  // {
  //   path: 'roles/create',
  //   component: CreateRoleComponent,
  //   data: { breadcrumb: 'Create' },
  // },
  // {
  //   path: 'roles/edit/:id',
  //   component: CreateRoleComponent,
  //   data: { breadcrumb: 'Edit' },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
