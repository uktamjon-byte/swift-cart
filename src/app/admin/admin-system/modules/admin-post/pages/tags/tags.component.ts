import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { PostBlogService } from '../../service/post.service';
import { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { catchError, EMPTY, finalize, Subject, takeUntil } from 'rxjs';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { ITag } from '../../types/interfaces/post.interface';
import { TagService } from '../../service/tag.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';
import { permissions } from 'src/app/constants/permissions';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit, OnDestroy {
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  collapsed: any;
  selectedPost: any;
  tags: ITag[] = [];
  permissions = permissions;
  private destroy$ = new Subject<void>();
  canCreateTag = false;
  canUpdateTag = false;
  canDeleteTag = false;
  canEditOrDelete = false;
  constructor(
    private router: Router,
    private notifyServiceMessage: NotifyServiceMessage,
    private tagService: TagService,
    public permission: PermissionsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.canCreateTag = this.permission.has(this.permissions.blogTagCreate);
    this.canUpdateTag = this.permission.has(this.permissions.blogTagUpdate);
    this.canDeleteTag = this.permission.has(this.permissions.blogTagDelete);
    this.canEditOrDelete = this.canUpdateTag || this.canDeleteTag;
    this.tagService
      .getTags()
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
        if (res) {
          this.tags = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Tags not found',
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

  deleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmWindowComponent, {
      width: '420px',
      maxWidth: '90vw',
      disableClose: true,
      autoFocus: false,
      data: { title: 'Delete', message: 'Are you sure you want to delete it' },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (DialogWindowButtonType.confirm === res) {
        this.tagService
          .deleteTag(id)
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
              this.tags = this.tags.filter((r) => r.id !== id);
              this.notifyServiceMessage.opeSnackBar(
                'Tag has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete tag',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  editRow(id: number) {
    this.router.navigate([`/admin/blog/tag/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
