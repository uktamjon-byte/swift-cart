import { Component, OnInit } from '@angular/core';
import { IUserRequest } from '../../types/interfaces/pages.interface';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { UserRequestService } from '../../services/user-request.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss'],
})
export class UserRequestComponent implements OnInit {
  collapsed: any;
  private destroy$ = new Subject<void>();
  userRequest: IUserRequest[] = [];
  constructor(
    private userRequests: UserRequestService,
    private notifyServiceMessage: NotifyServiceMessage
  ) {}

  ngOnInit(): void {
    this.uploadUserRequest();
  }

  uploadUserRequest() {
    this.userRequests
      .getUserRequest()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading user requests, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (!response.success) {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to load user request',
            NotifyMessageType.error
          );
          return;
        }

        if (!response.data || response.data.length === 0) {
          this.notifyServiceMessage.opeSnackBar(
            'No request was made by user',
            NotifyMessageType.notify
          );
          return;
        }
        this.userRequest = response.data;
      });
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  onRowRemoved(e: any) {
    console.log('Deleted:', e.data);
  }
}
