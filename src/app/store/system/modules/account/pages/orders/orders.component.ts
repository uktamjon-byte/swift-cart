import { Component, OnInit } from '@angular/core';
import { orderStatus } from '../../types/enums';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   orders = [
      {orderId:1555, date:'Apr 14, 2025', status:orderStatus.panding, total:20215},
      {orderId:1555, date:'Apr 14, 2025', status:orderStatus.pendingPayment, total:20215},
      {orderId:1555, date:'Apr 14, 2025', status:orderStatus.complete, total:20215},
    ]

}
