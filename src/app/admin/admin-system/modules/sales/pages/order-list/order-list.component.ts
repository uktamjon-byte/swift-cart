import { Component, OnInit, ViewChild } from '@angular/core';
import { UserOrder } from '../../types/interfaces/order.interface';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { OrderStatus } from '../../types/enams/order.enum';
import { permissions } from 'src/app/constants/permissions';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';
import {
  DialogWindowButtonType,
  NotifyMessageType,
} from 'src/app/shared/enums/notify.enum';
import { OrderService } from '../../services/order.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  selectedOrder!: UserOrder;
  private destroy$ = new Subject<void>();
  permissions = permissions;
  canCreateOrder = false;
  canUpdateOrder = false;
  canDeleteOrder = false;
  canEditOrDelete = false;
  constructor(
    private router: Router,
    private notifyServiceMessage: NotifyServiceMessage,
    private permission: PermissionsService,
    public dialog: MatDialog,
    private orderService: OrderService,
  ) {}

  orders: UserOrder[] = [
    {
      id: 1,
      customerName: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      status: 'Pending',
      orderDate: new Date('2025-10-01'),
      total: 129.99,
    },
    {
      id: 2,
      customerName: 'Michael Brown',
      email: 'michael.brown@example.com',
      status: 'Processing',
      orderDate: new Date('2025-10-02'),
      total: 249.5,
    },
    {
      id: 3,
      customerName: 'Sofia Miller',
      email: 'sofia.miller@example.com',
      status: 'Shipped',
      orderDate: new Date('2025-10-03'),
      total: 75.0,
    },
    {
      id: 4,
      customerName: 'David Lee',
      email: 'david.lee@example.com',
      status: 'Delivered',
      orderDate: new Date('2025-10-04'),
      total: 310.75,
    },
    {
      id: 5,
      customerName: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      status: 'Cancelled',
      orderDate: new Date('2025-10-05'),
      total: 99.99,
    },
    {
      id: 6,
      customerName: 'Oliver Davis',
      email: 'oliver.davis@example.com',
      status: 'Delivered',
      orderDate: new Date('2025-10-06'),
      total: 460.25,
    },
  ];

  ngOnInit(): void {
    this.canCreateOrder = this.permission.has(this.permissions.orderCreate);
    this.canUpdateOrder = this.permission.has(this.permissions.orderUpdate);
    this.canDeleteOrder = this.permission.has(this.permissions.orderDelete);
    this.canEditOrDelete = this.canUpdateOrder || this.canDeleteOrder;
    this.loadOrders();
  }

  loadOrders() {
    this.orderService
      .getOrders()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading orders, please try again later',
            NotifyMessageType.error,
          );
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        if (res.success) {
          this.orders = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to load orders',
            NotifyMessageType.error,
          );
        }
      });
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Pending:
        return 'status-pending';
      case OrderStatus.Processing:
        return 'status-processing';
      case OrderStatus.Shipped:
        return 'status-shipped';
      case OrderStatus.Delivered:
        return 'status-delivered';
      case OrderStatus.Cancelled:
        return 'status-cancelled';
      default:
        return '';
    }
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
        this.orderService
          .deleteOrder(id)
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
              this.orders = this.orders.filter((r) => r.id !== id);
              this.notifyServiceMessage.opeSnackBar(
                'Order has been deleted successfully',
                NotifyMessageType.notify,
              );
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to delete order',
                NotifyMessageType.error,
              );
            }
          });
      }
    });
  }

  editRow(id: number) {
    this.router.navigate([`/admin/sales/order/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
