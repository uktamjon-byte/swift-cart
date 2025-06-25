import { Component, OnInit } from '@angular/core';
import { IFooterMain } from '../../types/system.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

public footerList:IFooterMain[]=[];

  constructor() { 
   this.footerList.push(
  {
    headerTitile: 'contactUs',
    hasSocialAccount: true,
    menuList: [
      {
        title: 'contactPhone',
        isLink: true,
        src: '#',
        iconClass: 'fa-solid fa-phone'
      },
      {
        title: 'contactEmail',
        isLink: true,
        src: '#',
        iconClass: 'fa-regular fa-envelope'
      },
      {
        title: 'contactAddress',
        isLink: false,
        iconClass: 'fa-solid fa-location-crosshairs'
      }
    ]
  },

  {
    headerTitile: 'myAccounts',
    menuList: [
      { title: 'dashboard', isLink: true, src: '#' },
      { title: 'myOrders', isLink: true, src: '#' },
      { title: 'myReviews', isLink: true, src: '#' },
      { title: 'myProfile', isLink: true, src: '#' }
    ]
  },

  {
    headerTitile: 'ourServices',
    menuList: [
      { title: 'returnPolicy', isLink: true, src: '/policies/return-policy' },
      { title: 'faq', isLink: true, src: '/policies/faq' },
      { title: 'privacyPolicy', isLink: true, src: '/policies/privacy' },
      { title: 'termsOfUse', isLink: true, src: '/policies/terms' }
    ]
  },

  {
    headerTitile: 'tags',
    isFooterTag: true,
    menuList: [
      { title: 'accessories', isLink: true, iconClass: 'fa-solid fa-tag', src: '#', id: 1 },
      { title: 'electronics', isLink: true, iconClass: 'fa-solid fa-tag', src: '#', id: 2 },
      { title: 'entertainment', isLink: true, iconClass: 'fa-solid fa-tag', src: '#', id: 3 },
      { title: 'fashion', isLink: true, iconClass: 'fa-solid fa-tag', src: '#', id: 4 },
      { title: 'gadgets', isLink: true, iconClass: 'fa-solid fa-tag', src: '#', id: 5 },
      { title: 'hotDeals', isLink: true, iconClass: 'fa-solid fa-tag', src: '#', id: 6 },
      { title: 'lifestyle', isLink: true, iconClass: 'fa-solid fa-tag', src: '#', id: 7 },
      { title: 'smartphones', isLink: true, iconClass: 'fa-solid fa-tag', src: '#', id: 8 }
    ]
  }
);

  }

  ngOnInit(): void {
  }

}
