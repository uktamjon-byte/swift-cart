import { Component, OnInit } from '@angular/core';
import { IProduct } from './types/interfaces/interfaces';
import { ShopService } from './services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {


  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
   
  }

}
