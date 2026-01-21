import {
  Component,
  enableProdMode,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Route, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import DataGrid, { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { PostBlogService } from '../../service/post.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { IPost } from '../../types/interfaces/post.interface';
import { constants } from 'src/app/constants/constants';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { permissions } from 'src/app/constants/permissions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  collapsed = false;
  private gridInstance!: DataGrid;
  private destroy$ = new Subject<void>();
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  posts: IPost[] = [];
  blogAuthor: string | null = null;
  permissions = permissions;
  canCreateBlog = false;
  canUpdateBlog = false;
  canDeleteBlog = false;
  canEditOrDelete = false;
  constructor(
    private router: Router,
    private postBlogService: PostBlogService,
    private notifyServiceMessage: NotifyServiceMessage,
    public permission: PermissionsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.canCreateBlog = this.permission.has(this.permissions.blogCreate);
    this.canUpdateBlog = this.permission.has(this.permissions.blogUpdate);
    this.canDeleteBlog = this.permission.has(this.permissions.blogDelete);
    this.canEditOrDelete = this.canUpdateBlog || this.canDeleteBlog;
    this.postBlogService
      .getPosts()
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
          this.posts = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            res.message,
            NotifyMessageType.error,
          );
        }
      });
  }

  get getUrl() {
    return constants.baseUrlServer;
  }

  goToComments(commentId: number) {
    this.router.navigate(['/admin/blog/post/comments', commentId]);
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  public onInitGrid(e: any) {
    this.gridInstance = e.component;
  }

  editRow(id: number) {
    this.router.navigate([`/admin/blog/post/edit/${id}`]);
  }

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
        this.postBlogService
          .deletePost(id)
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
              this.posts = this.posts.filter((r) => r.id !== id);
              console.log('users');
              this.notifyServiceMessage.opeSnackBar(
                'Post has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete post',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
