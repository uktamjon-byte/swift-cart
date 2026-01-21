import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPermission } from '../../types/interfaces/user.interface';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { PermissionsService } from '../../../../../admin-auth/services/permission.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { ContentReadyEvent, RowRemovingEvent } from 'devextreme/ui/data_grid';
import { permissions } from 'src/app/constants/permissions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
})
export class PermissionListComponent implements OnInit, OnDestroy {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  selectedPermission!: IPermission;
  permissions!: IPermission[];
  private destroy$ = new Subject<void>();
  permission = permissions;
  canCreatePermission = false;
  canUpdatePermission = false;
  canDeletePermission = false;
  canEditOrDeletePermission = false;
  constructor(
    private router: Router,
    private permissionService: PermissionService,
    private notifyServiceMessage: NotifyServiceMessage,
    public permits: PermissionsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.canCreatePermission = this.permits.has(
      this.permission.permissionCreate,
    );
    this.canUpdatePermission = this.permits.has(
      this.permission.permissionUpdate,
    );
    this.canDeletePermission = this.permits.has(
      this.permission.permissionDelete,
    );
    this.canEditOrDeletePermission =
      this.canUpdatePermission || this.canDeletePermission;
    this.permissionService
      .getPermissions()
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
          this.permissions = data.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            data.message,
            NotifyMessageType.error,
          );
        }
      });
  }

  contentReady = (e: ContentReadyEvent) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };
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
        this.permissionService
          .deletePermission(id)
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
              this.permissions = this.permissions.filter((r) => r.id !== id);
              console.log('users');
              this.notifyServiceMessage.opeSnackBar(
                'Permission has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete permission',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  editRow(id: number) {
    this.router.navigate([`/admin/users/permissions/edit/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
