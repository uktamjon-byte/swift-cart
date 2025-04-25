import { Component, OnInit } from '@angular/core';
import { orderStatus } from '../../types/enums';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor() { }
 reviews = [
        {img:'../../../../../../../assets/imagis/product3.jpg', title:'Sennheiser Consumer Audio Momentum 4 Wireless Headphones', date:'Apr 14, 2025', status:orderStatus.panding},
        {img:'../../../../../../../assets/imagis/product3.jpg', title:'Sennheiser Consumer Audio Momentum 4 Wireless Headphones',  date:'Apr 14, 2025', status:orderStatus.pendingPayment},
        {img:'../../../../../../../assets/imagis/product3.jpg', title:'Sennheiser Consumer Audio Momentum 4 Wireless Headphones', date:'Apr 14, 2025', status:orderStatus.panding},
      ]
  ngOnInit(): void {
  }

}
