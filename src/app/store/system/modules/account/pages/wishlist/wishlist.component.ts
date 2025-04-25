import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';
import { orderStatus } from '../../types/enums';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

    wishlist = [
        {img:'../../../../../../../assets/imagis/product3.jpg', title:'Sennheiser Consumer Audio Momentum 4 Wireless Headphones', price:63654, availibility:orderStatus.panding},
        {img:'../../../../../../../assets/imagis/product3.jpg', title:'Sennheiser Consumer Audio Momentum 4 Wireless Headphones', price:63654, availibility:orderStatus.panding},
        {img:'../../../../../../../assets/imagis/product3.jpg', title:'Sennheiser Consumer Audio Momentum 4 Wireless Headphones', price:63654, availibility:orderStatus.panding},
      ]
  ngOnInit(): void {
  }
  deleteProduct(){
    this.dialog.open(ConfirmWindowComponent,{
      data:{
        title:'Sennheiser Consumer Audio Momentum 4 Wireless Headphones',
        message:'Are you sure you wanna delete this product from wishlist?'
      }
    })
  }
}
