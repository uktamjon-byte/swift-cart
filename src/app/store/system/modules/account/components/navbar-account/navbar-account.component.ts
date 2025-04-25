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
    {title:'Dashboard', icon:'fa-solid fa-gauge', link:'/dashboard'},
    {title:'My Orders', icon:'fa-solid fa-cart-shopping', link:'/orders'},
    {title:'My Wishlist', icon:'fa-regular fa-heart', link:'/wishlist'},
    {title:'My Review', icon:'fa-solid fa-message', link:'/reviews'},
    {title:'My Addresses', icon:'fa-solid fa-address-card', link:'/address'},
    {title:'My Profile', icon:'fa-solid fa-user', link:'/profile'}
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
