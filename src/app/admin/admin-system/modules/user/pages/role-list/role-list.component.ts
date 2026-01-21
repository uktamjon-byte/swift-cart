import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { IRole } from '../../types/interfaces/user.interface';
import { Router } from '@angular/router';
import { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { RoleService } from '../../services/role.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { permissions } from 'src/app/constants/permissions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit, OnDestroy {
  collapsed = false;
  selectedRole!: IRole;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  private destroy$ = new Subject<void>();
  roles: IRole[] = [];
  permissions = permissions;
  canCreateRole = false;
  canUpdateRole = false;
  canDeleteRole = false;
  canEditOrDeleteRole = false;
  constructor(
    private router: Router,
    private roleService: RoleService,
    private notifyServiceMessage: NotifyServiceMessage,
    public permission: PermissionsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.canCreateRole = this.permission.has(this.permissions.roleCreate);
    this.canUpdateRole = this.permission.has(this.permissions.roleDelete);
    this.canDeleteRole = this.permission.has(this.permissions.roleDelete);
    this.canEditOrDeleteRole = this.canUpdateRole || this.canDeleteRole;
    this.roleService
      .getRoles()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong, please try again later',
            NotifyMessageType.error,
          );
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        if (res.success) {
          this.roles = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to upload roles',
            NotifyMessageType.error,
          );
        }
      });
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  editRow(id: number) {
    this.router.navigate([`/admin/users/roles/edit/${id}`]);
  }

  deleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      width: '420px',
      maxWidth: '90vw',
      disableClose: true,
      autoFocus: false,
      data: { title: 'Delete', message: 'Are you sure you want to delete it' },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log('id data', id);
      if (DialogWindowButtonType.confirm === res) {
        this.roleService
          .deleteRoles(id)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              this.notifyServiceMessage.opeSnackBar(
                'Something went wrong, please try again later',
                NotifyMessageType.error,
              );
              return EMPTY;
            }),
          )
          .subscribe((data) => {
            if (data.success) {
              this.roles = this.roles.filter((r) => r.id !== id);
              console.log('users');
              this.notifyServiceMessage.opeSnackBar(
                'Role has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete role',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
