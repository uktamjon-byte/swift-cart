import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { DxDataGridComponent } from 'devextreme-angular';
import { ICategoryDetail } from '../../types/interfaces/product.interface';
import { Router } from '@angular/router';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { CategoryService } from '../../services/category.service';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { constants } from 'src/app/constants/constants';
import { permissions } from 'src/app/constants/permissions';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

interface Category {
  name: string;
  children?: Category[];
}

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit, OnDestroy {
  treeControl = new NestedTreeControl<Category>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  collapsed = false;
  selectedPost: any;
  private destroy$ = new Subject<void>();
  categories: ICategoryDetail[] = [];
  permissions = permissions;
  canCreateCategory = false;
  canUpdateCategory = false;
  canDeleteCategory = false;
  canEditOrDelete = false;
  constructor(
    private router: Router,
    private notifyServiceMessage: NotifyServiceMessage,
    private categoryService: CategoryService,
    public permission: PermissionsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.canCreateCategory = this.permission.has(
      this.permissions.categoryCreate,
    );
    this.canUpdateCategory = this.permission.has(
      this.permissions.categoryUpdate,
    );
    this.canDeleteCategory = this.permission.has(
      this.permissions.categoryDelete,
    );
    this.canEditOrDelete = this.canUpdateCategory || this.canDeleteCategory;
    this.getCategories();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .pipe(
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading category list, please try again later',
            NotifyMessageType.error,
          );
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        if (res.success) {
          this.categories = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to upload categories',
            NotifyMessageType.error,
          );
        }
      });
  }

  get getUrl() {
    return constants.baseUrlServer;
  }

  hasChild = (_: number, node: Category) =>
    !!node.children && node.children.length > 0;

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
        this.categoryService
          .deleteCategory(id)
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
              this.categories = this.categories.filter((r) => r.id !== id);
              this.notifyServiceMessage.opeSnackBar(
                'Category has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete category',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  editRow(e: any) {
    const category = e.row.data;
    this.router.navigate([`/admin/product/categories/edit/${category.id}`]);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
