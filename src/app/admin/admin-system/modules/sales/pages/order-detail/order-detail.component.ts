import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  orderStatus = [
    { id: 1, name: 'Panding' },
    { id: 1, name: 'Shipped' },
    { id: 1, name: 'Delivered' },
    { id: 1, name: 'Cancelled' },
    { id: 1, name: 'Proccessing' },
  ];
}
