import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { IRole } from '../../types/interfaces/user.interface';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { RoleService } from '../../services/role.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  collapsed = false;
  selectedRole!: IRole;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  private destroy$ = new Subject<void>();
  roles: IRole[] = [];
  constructor(
    private router: Router,
    private roleService: RoleService,
    private notifyServiceMessage: NotifyServiceMessage
  ) {}

  ngOnInit(): void {
    this.roleService
      .getRoles()
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
          this.roles = data.data;
          console.log('data', data);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            data.message,
            NotifyMessageType.error
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

  editRow(e: any) {
    const role = e.row.data;
    this.router.navigate([`/users/roles/edit/${role.id}`]);
  }

  onRowRemoving(e: RowRemovingEvent) {
    e.cancel = true;
    const data = e.data;
    this.roleService
      .deleteRoles(e.data.id)
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
      .subscribe((res) => {
        if (res.success) {
          this.roles = this.roles.filter((r) => r.id !== e.data.id);
          this.notifyServiceMessage.opeSnackBar(
            'Role has been deleted successfully',
            NotifyMessageType.notify
          );
        } else {
          e.cancel = true;
          this.notifyServiceMessage.opeSnackBar(
            res.message,
            NotifyMessageType.error
          );
        }
      });

    console.log('Deleted:', e.data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
