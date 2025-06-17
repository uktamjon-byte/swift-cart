import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { IProduct } from "../../shop/types/interfaces/interfaces";
import { ProductStatus } from "../../shop/types/enums/enums";
import * as bootstrap from 'bootstrap';
@Injectable({
  providedIn:'root'
})
export class ShopService {
  pruduct:IProduct[]=[];
  public filterSidebarStatus = new BehaviorSubject<boolean>(false);
  public highPrice = new BehaviorSubject<number>(155555);
  public toggleListView = new BehaviorSubject<boolean>(false);
  public isAddWishlistActive = new BehaviorSubject<boolean>(false);
  public isCampareListActive = new BehaviorSubject<boolean>(false);
  public isShopSidebarActive = new BehaviorSubject<boolean>(false);

  constructor() {
    this.pruduct.push(
      {
      id:1,
      title:'Apple 32-inch Pro Display XDR with Retina 6K Display',
      image:['assets/imagis/product1.jpg',
              'assets/imagis/product2.jpg',
              'assets/imagis/product3.jpg',
              'assets/imagis/product4.jpg',
              'assets/imagis/product5.jpg',],
      price:155555,
      description:'32-inch LCD display with Retina 6K resolution (6016 by 3384 pixels) Pro Stand and VESA Mount Adapter sold separately Extreme Dynamic Range (XDR) Brightness: 1000 nits sustained, 1600 nits peak Contrast ratio: 1,000,000:1 P3 wide color gamut, 10-bit color depth Superwide viewing angle Reference modes One Thunderbolt 3 port, three USB-C ports',
      rating:0,
      status:ProductStatus.out,
      category:'Electronics',
      tags:['Electronics', 'Gadgets', 'Hot Deals', 'Gears']
    },
    {
      id:2,
      title:'Apple 32-inch Pro Display XDR with Retina 6K Display',
      image:['assets/imagis/product1.jpg',
        'assets/imagis/product2.jpg',
        'assets/imagis/product3.jpg',
        'assets/imagis/product4.jpg',
        'assets/imagis/product5.jpg',],
      price:155555,
      description:'32-inch LCD display with Retina 6K resolution (6016 by 3384 pixels) Pro Stand and VESA Mount Adapter sold separately Extreme Dynamic Range (XDR) Brightness: 1000 nits sustained, 1600 nits peak Contrast ratio: 1,000,000:1 P3 wide color gamut, 10-bit color depth Superwide viewing angle Reference modes One Thunderbolt 3 port, three USB-C ports',
      rating:0,
      status:ProductStatus.out,
      category:'Electronics',
      tags:['Electronics', 'Gadgets', 'Hot Deals', 'Gears']
    },
    {
      id:3,
      title:'Apple 32-inch Pro Display XDR with Retina 6K Display',
      image:['assets/imagis/product1.jpg',
        'assets/imagis/product2.jpg',
        'assets/imagis/product3.jpg',
        'assets/imagis/product4.jpg',
        'assets/imagis/product5.jpg',],
      price:155555,
      description:'32-inch LCD display with Retina 6K resolution (6016 by 3384 pixels) Pro Stand and VESA Mount Adapter sold separately Extreme Dynamic Range (XDR) Brightness: 1000 nits sustained, 1600 nits peak Contrast ratio: 1,000,000:1 P3 wide color gamut, 10-bit color depth Superwide viewing angle Reference modes One Thunderbolt 3 port, three USB-C ports',
      rating:0,
      status:ProductStatus.new,
      category:'Electronics',
      tags:['Electronics', 'Gadgets', 'Hot Deals', 'Gears']
    },
    {
      id:4,
      title:'Apple 32-inch Pro Display XDR with Retina 6K Display',
      image:['assets/imagis/product1.jpg',
        'assets/imagis/product2.jpg',
        'assets/imagis/product3.jpg',
        'assets/imagis/product4.jpg',
        'assets/imagis/product5.jpg',],
      price:155555,
      description:'32-inch LCD display with Retina 6K resolution (6016 by 3384 pixels) Pro Stand and VESA Mount Adapter sold separately Extreme Dynamic Range (XDR) Brightness: 1000 nits sustained, 1600 nits peak Contrast ratio: 1,000,000:1 P3 wide color gamut, 10-bit color depth Superwide viewing angle Reference modes One Thunderbolt 3 port, three USB-C ports',
      rating:0,
      status:ProductStatus.new,
      category:'Electronics',
      tags:['Electronics', 'Gadgets', 'Hot Deals', 'Gears']
    },
    {
      id:5,
      title:'Apple 32-inch Pro Display XDR with Retina 6K Display',
      image:['assets/imagis/product1.jpg',
        'assets/imagis/product2.jpg',
        'assets/imagis/product3.jpg',
        'assets/imagis/product4.jpg',
        'assets/imagis/product5.jpg',],
      price:155555,
      description:'32-inch LCD display with Retina 6K resolution (6016 by 3384 pixels) Pro Stand and VESA Mount Adapter sold separately Extreme Dynamic Range (XDR) Brightness: 1000 nits sustained, 1600 nits peak Contrast ratio: 1,000,000:1 P3 wide color gamut, 10-bit color depth Superwide viewing angle Reference modes One Thunderbolt 3 port, three USB-C ports',
      rating:0,
      status:ProductStatus.in,
      category:'Electronics',
      tags:['Electronics', 'Gadgets', 'Hot Deals', 'Gears']
    },
    {
      id:6,
      title:'Apple 32-inch Pro Display XDR with Retina 6K Display',
      image:['assets/imagis/product1.jpg',
        'assets/imagis/product2.jpg',
        'assets/imagis/product3.jpg',
        'assets/imagis/product4.jpg',
        'assets/imagis/product5.jpg',],
      price:155555,
      description:'32-inch LCD display with Retina 6K resolution (6016 by 3384 pixels) Pro Stand and VESA Mount Adapter sold separately Extreme Dynamic Range (XDR) Brightness: 1000 nits sustained, 1600 nits peak Contrast ratio: 1,000,000:1 P3 wide color gamut, 10-bit color depth Superwide viewing angle Reference modes One Thunderbolt 3 port, three USB-C ports',
      rating:0,
      status:ProductStatus.out,
      category:'Electronics',
      tags:['Electronics', 'Gadgets', 'Hot Deals', 'Gears']
    },
    {
      id:7,
      title:'Apple 32-inch Pro Display XDR with Retina 6K Display',
      image:['assets/imagis/product1.jpg',
        'assets/imagis/product2.jpg',
        'assets/imagis/product3.jpg',
        'assets/imagis/product4.jpg',
        'assets/imagis/product5.jpg',],
      price:155555,
      description:'32-inch LCD display with Retina 6K resolution (6016 by 3384 pixels) Pro Stand and VESA Mount Adapter sold separately Extreme Dynamic Range (XDR) Brightness: 1000 nits sustained, 1600 nits peak Contrast ratio: 1,000,000:1 P3 wide color gamut, 10-bit color depth Superwide viewing angle Reference modes One Thunderbolt 3 port, three USB-C ports',
      rating:0,
      status:ProductStatus.in,
      category:'Electronics',
      tags:['Electronics', 'Gadgets', 'Hot Deals', 'Gears']
    }
  );


  this.isShopSidebarActive.subscribe((res)=>{
    console.log('is shop sidebar', res);
    if(res){
      this.openOffcanvas();
    }else{
      this.closeOffcanvas();
    }
  });
  }

   openOffcanvas(): void {
        const offcanvasElement = document.getElementById('offcanvasAddedProducts');
        if (offcanvasElement) {
          const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
          offcanvasInstance.show();
        }
      }

      closeOffcanvas(): void {
        const offcanvasElement = document.getElementById('offcanvasAddedProducts');
        if (offcanvasElement) {
          const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
          offcanvasInstance.hide();
        }
      }
  
}