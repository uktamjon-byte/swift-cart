import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { title } from 'process';
import { NavigationOptions } from 'swiper/types';


@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrls: ['./top-content.component.scss']
})
export class TopContentComponent implements OnInit{

  constructor() { }
  @ViewChild('prevBtn', { static: false }) prevBtn!: ElementRef;
  @ViewChild('nextBtn', { static: false }) nextBtn!: ElementRef;



  
  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 },
    576: { slidesPerView: 1.2, spaceBetween: 15 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 }
  };
  

  

  images=[
    {srcImg:'../../../../../../../assets/imagis/banner1.png', alt:'bannerimage', title:'Mavic Pro', caption:'The creatives shop for flying cameras and flight controllers'},
    {srcImg:'../../../../../../../assets/imagis/banner2.png', alt:'bannerimage', title:'3D Virtual Reality', caption:'There are a upgrade for the quality and control in the home'},
    {srcImg:'../../../../../../../assets/imagis/banner3.png', alt:'bannerimage', title:'XIAOMI SPEAKER', caption:'The creatives shop for flying cameras and flight controllers'},
    
  ]

 
  

  ngOnInit(): void {
  }




}
