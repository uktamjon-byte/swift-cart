import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../../../shared/services/shop.service';
import { IProduct } from '../../types/interfaces/interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent implements OnInit, OnDestroy {
  product:IProduct[]=[];
  isListView:boolean = false;
  public $destroy = new Subject<void>();
  constructor( private shopService:ShopService ) { }
  ngOnInit(){
    this.product = this.shopService.pruduct
    console.log('product', this.product)

    this.shopService.toggleListView
    .pipe(takeUntil(this.$destroy))
    .subscribe((val)=>{
      this.isListView = val    
    })
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
