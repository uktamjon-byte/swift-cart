import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IBrand, IBrandDetail } from '../../types/interfaces/product.interface';
import { DxDataGridComponent } from 'devextreme-angular';
import { Route, Router } from '@angular/router';
import { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { BrandService } from '../../services/brand.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { constants } from 'src/app/constants/constants';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { permissions } from 'src/app/constants/permissions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent implements OnInit, OnDestroy {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  categories: any;
  selectedPost: any;
  private destroy$ = new Subject<void>();
  brands: IBrandDetail[] = [];
  permissions = permissions;
  canCreateBrand = false;
  canUpdateBrand = false;
  canDeleteBrand = false;
  canEditOrDelete = false;
  constructor(
    private router: Router,
    private brandService: BrandService,
    private notifyServiceMessage: NotifyServiceMessage,
    public permission: PermissionsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.canCreateBrand = this.permission.has(this.permissions.brandCreate);
    this.canUpdateBrand = this.permission.has(this.permissions.brandUpdate);
    this.canDeleteBrand = this.permission.has(this.permissions.brandDelete);
    this.canEditOrDelete = this.canUpdateBrand || this.canDeleteBrand;
    this.getBrands();
  }
  get getUrl() {
    return constants.baseUrlServer;
  }
  getBrands() {
    this.brandService
      .getBrands()
      .pipe(
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading brand list, please try again later',
            NotifyMessageType.error,
          );
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        if (res.success) {
          this.brands = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to upload brands',
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
      console.log('id data', id);
      if (DialogWindowButtonType.confirm === res) {
        this.brandService
          .deleteBrand(id)
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
              this.brands = this.brands.filter((r) => r.id !== id);
              this.notifyServiceMessage.opeSnackBar(
                'Brand has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete brand',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  editRow(id: number) {
    this.router.navigate([`admin/product/brand/edit/${id}`]);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
