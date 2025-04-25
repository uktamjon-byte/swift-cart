import { Component, OnInit } from '@angular/core';
import { orderStatus } from '../../types/enums';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  orders = [
    {orderId:1555, date:'Apr 14, 2025', status:orderStatus.complete, total:20215},
    {orderId:1555, date:'Apr 14, 2025', status:orderStatus.complete, total:20215},
    {orderId:1555, date:'Apr 14, 2025', status:orderStatus.complete, total:20215},
  ]

}
