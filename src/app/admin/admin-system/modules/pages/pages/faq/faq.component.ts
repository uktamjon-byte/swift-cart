import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IFaq } from '../../types/interfaces/pages.interface';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { FaqService } from '../../services/faq.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { permissions } from 'src/app/constants/permissions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {
  collapsed: any;
  selectedFaq!: IFaq;
  private destroy$ = new Subject<void>();
  faqs: IFaq[] = [];
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  permissions = permissions;
  canCreateFaq = false;
  canUpdateFaq = false;
  canDeleteFaq = false;
  canEditOrDelete = false;
  constructor(
    private router: Router,
    private notifyServiceMessage: NotifyServiceMessage,
    private faqService: FaqService,
    public permission: PermissionsService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.canCreateFaq = this.permission.has(this.permissions.faqCreate);
    this.canUpdateFaq = this.permission.has(this.permissions.faqUpdate);
    this.canDeleteFaq = this.permission.has(this.permissions.faqDelete);
    this.canEditOrDelete = this.canUpdateFaq || this.canDeleteFaq;
    this.uploadFaq();
  }

  uploadFaq() {
    this.faqService
      .getFaq()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading FAQ, please try again later',
            NotifyMessageType.error,
          );
          return EMPTY;
        }),
      )
      .subscribe((response) => {
        if (!response.success) {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to load user request',
            NotifyMessageType.error,
          );
          return;
        }

        if (!response.data || response.data.length === 0) {
          this.notifyServiceMessage.opeSnackBar(
            'No faq was wade to show, please create faq',
            NotifyMessageType.notify,
          );
          return;
        }
        this.faqs = response.data;
      });
  }

  truncateText(text: string, maxLength: number = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  contentReady = (e: any) => {
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
        this.faqService
          .deleteFaq(id)
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
              this.faqs = this.faqs.filter((r) => r.id !== id);
              this.notifyServiceMessage.opeSnackBar(
                'FAQ has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete FAQ',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  editRow(id: number) {
    this.router.navigate([`/admin/pages/faq/edit/${id}`]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
