import { Component, OnDestroy, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { Router } from '@angular/router';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  userName: string | null = null;
  userEmail: string | null = null;
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private notifyServiceMessage: NotifyServiceMessage,
    public router: Router
  ) {}
  toggleSidebar: boolean = false;
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('email');
    this.adminService.toggleSidebar.subscribe((val) => {
      this.toggleSidebar = val;
    });
  }

  sidebarToggle() {
    this.adminService.toggleSidebar.next(
      (this.toggleSidebar = !this.toggleSidebar)
    );
  }

  logOut() {
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      data: {
        title: 'Logout',
        message: 'Are you sure you wanna logout?',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (DialogWindowButtonType.confirm === res) {
        this.adminService
          .logoutUser()
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              this.router.navigate(['']);

              this.notifyServiceMessage.opeSnackBar(
                'Something went wrong while loging out this user, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            if (res.success) {
              localStorage.removeItem('loginToken');
              this.adminService.isLoggedIn.next(false);
              this.notifyServiceMessage.opeSnackBar(
                'User has been logged out successfully',
                NotifyMessageType.notify
              );
            }
          });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
