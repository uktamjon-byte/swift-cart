import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationOptions } from 'swiper/types';

@Component({
  selector: 'app-store-service',
  templateUrl: './store-service.component.html',
  styleUrls: ['./store-service.component.scss']
})
export class StoreServiceComponent implements OnInit {

  constructor() { }
  @ViewChild('prevFeatureBtn', { static: false }) prevFeatureBtn!: ElementRef;
  @ViewChild('nextFeatureBtn', { static: false }) nextFeatureBtn!: ElementRef;
  swiperNavConfig: NavigationOptions = {};
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.swiperNavConfig = {
        prevEl: this.prevFeatureBtn.nativeElement,
        nextEl: this.nextFeatureBtn.nativeElement,
      };
    });
  }
  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 },
    576: { slidesPerView: 1.2, spaceBetween: 15 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 }
  };

  features = [
    {
      icon: 'fa-solid fa-wallet',
      title: '24/7 Support',
      description: 'We’re always here for you.',
    },
    {
      icon: 'fa-solid fa-truck',
      title: 'Fast Shipping',
      description: 'Lightning fast delivery.',
    },
    {
      icon: 'fa-solid fa-shield',
      title: 'Secure Payments',
      description: 'Your data is safe with us.',
    },
    // Add more...
  ];

}
