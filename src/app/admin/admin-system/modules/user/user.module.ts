import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './pages/user-list/user-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UserRoutingModule } from './user-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxButtonModule,
} from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionListComponent } from './pages/permission-list/permission-list.component';
import { CreatePermissionComponent } from './pages/create-permission/create-permission.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { CreateRoleComponent } from './pages/create-role/create-role.component';

@NgModule({
  declarations: [
    UserListComponent,
    CreateUserComponent,
    PermissionListComponent,
    CreatePermissionComponent,
    RoleListComponent,
    CreateRoleComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    DxDataGridModule,
    DxBulletModule,
    DxButtonModule,
    DxTemplateModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
