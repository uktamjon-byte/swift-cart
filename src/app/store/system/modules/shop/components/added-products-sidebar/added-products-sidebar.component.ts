import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ShopService } from '../../../shared/services/shop.service';
import { IProduct } from '../../types/interfaces/interfaces';

@Component({
  selector: 'app-added-products-sidebar',
  templateUrl: './added-products-sidebar.component.html',
  styleUrls: ['./added-products-sidebar.component.scss']
})
export class AddedProductsSidebarComponent implements OnInit {

  constructor(private shopService:ShopService) { }
  selectedProducts:IProduct[]=[];


  ngOnInit(): void {
    console.log('init')
    // this.shopService.isShopSidebarActive
    // .subscribe((val)=>{
    //   console.log('-----', val);
    //   if(val){     
    //     this.openOffcanvas()
     
    // }
    // });
    this.selectedProducts = this.shopService.pruduct
  }

  // openOffcanvas(): void {
  //       const offcanvasElement = document.getElementById('offcanvasAddedProducts');
  //       if (offcanvasElement) {
  //         const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
  //         offcanvasInstance.show();
  //       }
  //     }

}
