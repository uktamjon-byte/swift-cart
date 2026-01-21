import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataGrid, { RowRemovingEvent } from 'devextreme/ui/data_grid';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { IMedia } from '../../../types/interfaces/admin.interface';
import { constants } from 'src/app/constants/constants';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { permissions } from 'src/app/constants/permissions';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  collapsed: any;
  gridInstance!: DataGrid;
  dataDialogTitle = null;
  isDialog: boolean = false;
  private destroy$ = new Subject<void>();
  files: { file: File; preview: string }[] = [];
  media: IMedia[] = [];
  thumbnail!: string;
  file!: File;
  previewUrl: SafeUrl | null = null;
  @Input() multiple = true;
  isSaving: boolean = false;
  permissions = permissions;
  canDeleteMedia = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any | null,
    @Optional() private dialogRef: MatDialogRef<FileManagerComponent>,
    private notifyServiceMessage: NotifyServiceMessage,
    private adminService: AdminService,
    private sanitizer: DomSanitizer,
    public permission: PermissionsService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.add('active');
  }

  onDragLeave(event: DragEvent) {
    (event.currentTarget as HTMLElement).classList.remove('active');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('active');
    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) return;

    if (this.multiple) {
      Array.from(files).forEach((file) => this.handleFile(file));
    } else {
      this.handleFile(files[0]);
    }
  }

  onFileSelect(event: Event) {
    if (this.permission.has(permissions.mediaCreate)) {
      const input = event.target as HTMLInputElement;
      if (!input.files || input.files.length === 0) return;
      if (this.multiple) {
        Array.from(input.files).forEach((file) => this.handleFile(file));
      } else {
        this.handleFile(input.files[0]);
      }
      input.value = '';
    } else {
      this.router.navigate(['/admin/401']);
    }
  }

  handleFile(file: File) {
    const exists = this.media.find((f) => f.name === file.name);
    if (exists) {
      this.notifyServiceMessage.opeSnackBar(
        `This ${exists.name} file already exists, please select different one`,
        NotifyMessageType.warning,
      );
      return;
    }
    this.file = file;

    const blobUrl = URL.createObjectURL(file);
    const safeUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
    this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);

    this.files.push({
      file: file,
      preview: safeUrl as string,
    });
  }

  removeFile(index: number, event: Event) {
    event.stopPropagation();

    const removed = this.files.splice(index, 1)[0];
    if (removed) URL.revokeObjectURL(removed.preview);
  }

  ngOnInit(): void {
    if (this.data?.isDialog) this.isDialog = false;
    console.log('isdialog', this.isDialog, this.data?.isDialog);
    this.canDeleteMedia = this.permission.has(this.permissions.mediaDelete);
    this.dataDialogTitle = this.data?.title;
    this.isDialog = this.data?.isDialog;
    this.getAllMedia();
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    window.addEventListener('drop', (e) => {
      e.preventDefault();
    });
  }

  getAllMedia() {
    this.adminService
      .getAllMedia()
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
          this.media = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to load media',
            NotifyMessageType.error,
          );
        }
      });
  }

  get getUrl() {
    return constants.baseUrlServer;
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

  selectImage(image: any) {
    this.dialogRef.close(image);
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
        this.adminService
          .deleteMedia(id)
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
              this.media = this.media.filter((r) => r.id !== id);
              this.notifyServiceMessage.opeSnackBar(
                'Media has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete media',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  uploadAllFiles() {
    this.isSaving = true;
    if (!this.files || this.files.length === 0) {
      this.notifyServiceMessage.opeSnackBar(
        'File not selectected',
        NotifyMessageType.error,
      );
      return;
    }

    const formData = new FormData();
    this.files.forEach((item) => {
      formData.append('images', item.file);
    });

    this.adminService
      .postMedia(formData)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong, please try again later',
            NotifyMessageType.error,
          );
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        if (res.success) {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Media uploaded successfully',
            NotifyMessageType.notify,
          );
          this.files = [];
          this.getAllMedia();
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to post media',
            NotifyMessageType.error,
          );
        }
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
