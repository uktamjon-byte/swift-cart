import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-navbar-account',
  templateUrl: './navbar-account.component.html',
  styleUrls: ['./navbar-account.component.scss']
})
export class NavbarAccountComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  navbarList=[
    {title:'dashboard', icon:'fa-solid fa-gauge', link:'/account/dashboard'},
    {title:'myOrders', icon:'fa-solid fa-cart-shopping', link:'/account/orders'},
    {title:'wishList', icon:'fa-regular fa-heart', link:'/account/wishlist'},
    {title:'myReviews', icon:'fa-solid fa-message', link:'/account/reviews'},
    {title:'myAddresses', icon:'fa-solid fa-address-card', link:'/account/address'},
    {title:'myProfile', icon:'fa-solid fa-user', link:'/account/profile'}
  ]
  ngOnInit(): void {
  }

  logout(){
    this.dialog.open(ConfirmWindowComponent, {
      data:{
        title:'Logout',
        message:'Are you sure you wanna logout?'
      }
    })
  }
}
