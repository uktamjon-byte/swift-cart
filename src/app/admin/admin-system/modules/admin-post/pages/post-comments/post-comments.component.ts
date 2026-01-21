import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { PostCommentService } from '../../service/post-comments.service';
import { ICommentPostDetail } from '../../types/interfaces/post.interface';
import { permissions } from 'src/app/constants/permissions';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit, OnDestroy {
  collapsed: any;
  gridInstance: any;
  private destroy$ = new Subject<void>();
  postId!: number;
  postComments: ICommentPostDetail[] = [];
  permissions = permissions;
  canUpdateBlogComment = false;
  canDeleteBlogComment = false;
  canEditOrDelete = false;
  constructor(
    private notifyServiceMessage: NotifyServiceMessage,
    private router: Router,
    private postCommentService: PostCommentService,
    private route: ActivatedRoute,
    public permission: PermissionsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.canUpdateBlogComment = this.permission.has(
      this.permissions.blogCommentUpdate,
    );
    this.canDeleteBlogComment = this.permission.has(
      this.permissions.blogCommentDelete,
    );
    this.canEditOrDelete =
      this.canUpdateBlogComment || this.canDeleteBlogComment;
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
    });
    this.getPostComments();
  }

  getPostComments() {
    this.postCommentService
      .getPostComments(this.postId)
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
          this.postComments = res.data;
          console.log('post data', res);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to upload comments',
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
        this.postCommentService
          .deleteComment(id)
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
              this.postComments = this.postComments.filter((r) => r.id !== id);
              console.log('users');
              this.notifyServiceMessage.opeSnackBar(
                'Comment has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete comment',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  editRow(id: number) {
    this.router.navigate([`/admin/blog/post/comments/edit/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
