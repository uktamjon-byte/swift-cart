import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../shared/services/shop.service';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {

  fromToPrice:{from:number, to:number}={from:0, to:10000}

  constructor(private shopService:ShopService) { }

  ngOnInit() {
  }


  changePrice(e:any, isFrom=true){
    let value = e.target.value;

    value = value ? parseInt(value) : 0;
    if(isFrom){
      this.fromToPrice.from =  value ;
    }else {
      this.fromToPrice.to = value;
    }

  }


}
