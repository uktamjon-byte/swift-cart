import { Component, OnInit, ViewChild } from '@angular/core';
import { UserOrder } from '../../types/interfaces/order.interface';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { OrderStatus } from '../../types/enams/order.enum';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  selectedOrder!: UserOrder;
  constructor(private router: Router) {}

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

  ngOnInit(): void {}

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
  onRowRemoved(e: any) {
    console.log('Deleted:', e.data);
  }

  onRowClick($event: any) {
    console.log('reree');
    this.selectedOrder = $event.data;
    // this.postBlogService.setPost(this.selectedPost);
    this.router.navigate([`/sales/order/${this.selectedOrder.id}`]);
  }
}
