import { Component, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin-system',
  templateUrl: './admin-system.component.html',
  styleUrls: ['./admin-system.component.scss']
})
export class AdminSystemComponent implements OnInit {
  isSidebarToggled:boolean = false;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
     this.adminService.toggleSidebar.subscribe(val=>{
      this.isSidebarToggled = val
     })
  }

  toggleSidebar(){
    this.adminService.toggleSidebar.next(false)
  }

}
