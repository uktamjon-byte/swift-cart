import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../shop/types/interfaces/interfaces';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
@Input() product:IProduct={} as IProduct;
isListView:boolean = false;
isAddWishlistActive:boolean = false;
isCampareListActive:boolean = false;
  constructor(private shopService:ShopService) { }

  ngOnInit() {
    this.shopService.toggleListView.subscribe((val=>{
      this.isListView = val;
    }))
  }

  addWishList(){
    this.isAddWishlistActive = !this.isAddWishlistActive; 
  }

  addCampareList(){
    this.isCampareListActive = !this.isCampareListActive;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'out': return 'out-of-stock';
      case 'new': return 'new';
      default: return '';
    }
  }

  addToCheckout(){
    this.shopService.isShopSidebarActive.next(true);
  }

}
