import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { PermissionListComponent } from './pages/permission-list/permission-list.component';
import { CreatePermissionComponent } from './pages/create-permission/create-permission.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { CreateRoleComponent } from './pages/create-role/create-role.component';

const routes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'create', component: CreateUserComponent },
  { path: 'edit/:id', component: CreateUserComponent },
  { path: 'permissions', component: PermissionListComponent },
  { path: 'permissions/create', component: CreatePermissionComponent },
  { path: 'permissions/edit/:id', component: CreatePermissionComponent },
  { path: 'roles', component: RoleListComponent },
  { path: 'roles/create', component: CreateRoleComponent },
  { path: 'roles/edit/:id', component: CreateRoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
