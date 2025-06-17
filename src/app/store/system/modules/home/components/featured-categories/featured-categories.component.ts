import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { ShopService } from '../../../shared/services/shop.service';
import { IProduct } from '../../../shop/types/interfaces/interfaces';

@Component({
  selector: 'app-featured-categories',
  templateUrl: './featured-categories.component.html',
  styleUrls: ['./featured-categories.component.scss']
})
export class FeaturedCategoriesComponent implements OnInit {

  products:IProduct[]=[];
  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    this.products = this.shopService.pruduct
  }

  breakpoints: SwiperOptions['breakpoints'] = {
    320: { slidesPerView: 1.2, spaceBetween: 10 },
    375:{slidesPerView: 2, spaceBetween:10},
    425:{slidesPerView: 2, spaceBetween:10},
    576: { slidesPerView: 2, spaceBetween: 15 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 5, spaceBetween: 30 },
  };
}
