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
    this.selectedProducts = this.shopService.pruduct;
  }

  inactivateSidebar(){
    this.shopService.isShopSidebarActive.next(false);
    console.log('disactive')
  }

}
