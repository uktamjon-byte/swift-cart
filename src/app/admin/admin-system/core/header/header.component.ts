import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  toggleSidebar:boolean = false;
  ngOnInit() {
   this.adminService.toggleSidebar.subscribe(val=>{
    this.toggleSidebar = val
   })
   
  }

  sidebarToggle(){
    this.adminService.toggleSidebar.next(this.toggleSidebar = !this.toggleSidebar);
    
     console.log(this.toggleSidebar)
  }
   

}
