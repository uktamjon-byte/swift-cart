import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { IProduct, IProductDetail } from './types/interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import DataGrid, { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { AdminService } from '../../services/admin.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { constants } from 'src/app/constants/constants';
import { permissions } from 'src/app/constants/permissions';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  gridInstance!: DataGrid;
  collapsed!: boolean;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  products!: IProductDetail[];
  private destroy$ = new Subject<void>();
  permissions = permissions;
  canCreateProduct = false;
  canUpdateProduct = false;
  canDeleteProduct = false;
  canEditOrDelete = false;
  constructor(
    private productService: ProductService,
    private router: Router,
    private notifyServiceMessage: NotifyServiceMessage,
    public permission: PermissionsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.canCreateProduct = this.permission.has(this.permissions.productCreate);
    this.canUpdateProduct = this.permission.has(this.permissions.productUpdate);
    this.canDeleteProduct = this.permission.has(this.permissions.productDelete);
    this.canEditOrDelete = this.canUpdateProduct || this.canDeleteProduct;
    this.getProducts();
  }
  getProducts() {
    this.productService
      .getProducts()
      .pipe(
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading products, please try again later',
            NotifyMessageType.error,
          );
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        if (res) {
          this.products = res.data.rows;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to load products',
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

  get getUrl() {
    return constants.baseUrlServer;
  }

  public onInitGrid(e: any) {
    this.gridInstance = e.component;
  }

  editRow(id: number) {
    this.router.navigate([`/admin/product/list/edit/${id}`]);
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
        this.productService
          .deleteProduct(id)
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
              this.products = this.products.filter((r) => r.id !== id);
              this.notifyServiceMessage.opeSnackBar(
                'Product has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete product',
                NotifyMessageType.error,
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
