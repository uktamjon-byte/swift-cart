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
        headerTitile:'Contact Us',
        hasSocialAccount:true,
        menuList:[
          {
            title:' +992959456667',
            isLink:true,
            src: '#',
            iconClass:'fa-solid fa-phone'
          },
          {
            title:' fake@decive.come',
            isLink:true,
            src: '#',
            iconClass:'fa-regular fa-envelope'
          },
          {
            title:' Spitamen, Uktam-legend',
            isLink:false,
            iconClass:'fa-solid fa-location-crosshairs'
          }
        ]
      },

      {
        headerTitile:'My Accaunts',
        menuList:[
          {
            title:'Dashboard',
            isLink:true,
            src: '#',
          },
          {
            title:'My Order',
            isLink:true,
            src: '#',
          },
          {
            title:'My Reviews',
            isLink:true,
            src:'#'
          },
          {
            title:'My Profile',
            isLink:true,
            src:'#'
          }
        ]
      },

      {
        headerTitile:'Our Services',
        menuList:[
          {
            title:'Return Policy',
            isLink:true,
            src: '#',
          },
          {
            title:'FAQ',
            isLink:true,
            src: '#',
          },
          {
            title:'Privacy & Policy',
            isLink:true,
            src:'#'
          },
          {
            title:'Term Of Use',
            isLink:true,
            src:'#'
          }      
        ]
      },

      {
        headerTitile:'Tags',
        isFooterTag:true,
        menuList:[
          {
            title:'Accessories',
            isLink:true,
            iconClass:'fa-solid fa-tag',
            src: '#',
            id:1,
          },
          {
            title:'Electronics',
            isLink:true,
            src: '#',
            iconClass:'fa-solid fa-tag',
            id:2,
          },
          {
            title:'Entertainment',
            isLink:true,
            src:'#',
            iconClass:'fa-solid fa-tag',
            id:3,
          },
          {
            title:'Fashion',
            isLink:true,
            src:'#',
            iconClass:'fa-solid fa-tag',
            id:4,
          },
          {
            title:'Gadgets',
            isLink:true,
            src:'#',
            iconClass:'fa-solid fa-tag',
            id:5,
          },
          {
            title:'Hot Deals',
            isLink:true,
            src:'#',
            iconClass:'fa-solid fa-tag',
            id:6,
          },
          {
            title:'LifeStyle',
            isLink:true,
            src:'#',
            iconClass:'fa-solid fa-tag',
            id:7,
          },
          {
            title:'Smartphones',
            isLink:true,
            src:'#',
            iconClass:'fa-solid fa-tag',
            id:8,
          }            
        ]
      }

    );
  }

  ngOnInit(): void {
  }

}
