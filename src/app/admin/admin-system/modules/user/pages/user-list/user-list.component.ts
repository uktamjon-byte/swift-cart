import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { IUser } from '../../types/interfaces/user.interface';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ContentReadyEvent, RowRemovingEvent } from 'devextreme/ui/data_grid';
import { UserService } from '../../services/user.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';

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
  constructor(
    private router: Router,
    private userService: UserService,
    private notifyServiceMessage: NotifyServiceMessage
  ) {}

  ngOnInit(): void {
    this.userService.savedUsers
      .pipe(
        catchError((err) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((users) => {
        if (users) {
          this.users = users.rows;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Users not found',
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
    this.userService
      .deleteUser(e.data.id)
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
          this.users = this.users.filter((r) => r.id !== e.data.id);
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
    console.log('edit clicked');
    const user = e.row.data;
    this.router.navigate([`/users/list/edit/${user.id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
