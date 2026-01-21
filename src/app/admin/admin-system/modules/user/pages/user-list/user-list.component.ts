import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { IUser } from '../../types/interfaces/user.interface';
import { Router } from '@angular/router';
import { ContentReadyEvent, RowRemovingEvent } from 'devextreme/ui/data_grid';
import { UserService } from '../../services/user.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { constants } from 'src/app/constants/constants';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { permissions } from 'src/app/constants/permissions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  collapsed = false;
  users: IUser[] = [];
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  private destroy$ = new Subject<void>();
  permissions = permissions;
  canCreateUser = false;
  canUpdateUser = false;
  canDeleteUser = false;
  canEditOrDelete = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private notifyServiceMessage: NotifyServiceMessage,
    public permission: PermissionsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.canCreateUser = this.permission.has(this.permissions.userCreate);
    this.canUpdateUser = this.permission.has(this.permissions.userUpdate);
    this.canDeleteUser = this.permission.has(this.permissions.userDelete);
    this.canEditOrDelete = this.canUpdateUser || this.canDeleteUser;
    this.userService
      .getUser()
      .pipe(
        catchError((err) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong, please try again later',
            NotifyMessageType.error,
          );
          return EMPTY;
        }),
      )
      .subscribe((users) => {
        if (users) {
          this.users = users.data.rows;
          console.log('user', this.users);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Users not found',
            NotifyMessageType.error,
          );
        }
      });
  }

  get getUrl() {
    return constants.baseUrlServer;
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
        this.userService
          .deleteUser(id)
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
              this.users = this.users.filter((r) => r.id !== id);
              console.log('users');
              this.notifyServiceMessage.opeSnackBar(
                'User has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete user',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  editRow(id: number) {
    this.router.navigate([`/admin/users/list/edit/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
