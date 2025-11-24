import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPermission } from '../../types/interfaces/user.interface';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import {
  ContentReadyEvent,
  RowClickEvent,
  RowRemovingEvent,
} from 'devextreme/ui/data_grid';
import { BreadcrumbService } from 'xng-breadcrumb';

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
  constructor(
    private router: Router,
    private permissionService: PermissionService,
    private notifyServiceMessage: NotifyServiceMessage
  ) {}

  ngOnInit(): void {
    this.permissionService
      .getPermissions()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((data) => {
        if (data.success) {
          this.permissions = data.data;
          console.log('data', data);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            data.message,
            NotifyMessageType.error
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

  onRowRemoving(e: RowRemovingEvent) {
    e.cancel = true;
    this.permissionService
      .deletePermission(e.data.id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((data) => {
        if (data.success) {
          this.permissions = this.permissions.filter((r) => r.id !== e.data.id);
          this.notifyServiceMessage.opeSnackBar(
            'Permission has been deleted successfully',
            NotifyMessageType.notify
          );
        } else {
          e.cancel = true;
          this.notifyServiceMessage.opeSnackBar(
            data.message,
            NotifyMessageType.error
          );
        }
      });
  }

  editRow(e: any) {
    const permission = e.row.data;
    this.router.navigate([`/users/permissions/edit/${permission.id}`], {
      state: { permission },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
