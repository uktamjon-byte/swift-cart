import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../services/system.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private systemService:SystemService) { }

   searchInput = document.getElementById('search-inp');
   searchNav = document.getElementById('search-nav');

  
   

  ngOnInit() {
    
  let scrollValue =  window.scrollY
  console.log('scroll ', scrollValue)

  //this.searchInput?.addEventListener
  } 

  activateResInput(){
    console.log('clicked')
    this.systemService.activeInputResBackdrop.next(true);
  }

  showSidebar(){
    this.systemService.triggerSidebar.next(true);
  }

  activateBottomTab(){
    console.log('clickedtab')
    this.systemService.triggerBottomTab.next(true);
  }

  

  
  // document.addEventListener('scrollTop', (){
          
  // })
  

}
