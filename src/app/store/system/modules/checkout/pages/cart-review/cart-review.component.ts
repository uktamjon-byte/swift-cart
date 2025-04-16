import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../shared/services/shop.service';
import { IProduct } from '../../../shop/types/interfaces/interfaces';
import { DialogWindowService } from 'src/app/shared/services/dialog-window.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-cart-review',
  templateUrl: './cart-review.component.html',
  styleUrls: ['./cart-review.component.scss']
})
export class CartReviewComponent implements OnInit {
  constructor(private shopService:ShopService, private dialogWindow:DialogWindowService, private dialog:MatDialog) { }
  selectedProducts:IProduct[]=[]
  ngOnInit() {
    this.selectedProducts = this.shopService.pruduct
  }

  deleteAllProduct(){

  }

  deleteProduct(){
   const dialogRef = this.dialog.open(ConfirmWindowComponent, {
    width: '400px',
    data: {
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
    },
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    console.log('Dialog result:', result);
    // if (result === 'ok') {
    //   // Perform OK logic
    // } else if (result === 'cancel') {
    //   // Perform Cancel logic
    // } else if (result === 'close') {
    //   // Handle close (X button)
    // }
  });
  
}


}
