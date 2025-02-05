import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../services/system.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ngZone: any;

  constructor(private systemService:SystemService) { }

   searchInput = document.getElementById('search-inp');
   searchNav = document.getElementById('search-nav');

  
   

  ngOnInit() {
  let scrollValue =  window.scrollY
  console.log('scroll ', scrollValue)

  //  this.ngZone.runOutsideAngular(() => {
  //       const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  //       tooltipTriggerList.forEach(tooltipTriggerEl => {
  //         new bootstrap.Tooltip(tooltipTriggerEl, {
  //           placement: 'top'
  //         });
  //       });
  //     })
  } 

  activateResInput(){
    this.systemService.activeInputResBackdrop.next(true);
  }

  showSidebar(){
    this.systemService.triggerSidebar.next(true);
  }

  activateBottomTab(){
    this.systemService.triggerBottomTab.next(true);
  }
}
