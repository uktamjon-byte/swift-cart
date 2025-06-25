import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SystemService } from '../../services/system.service';
import * as bootstrap from 'bootstrap';
import { ShopService } from '../../../modules/shared/services/shop.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  ngZone: any;
 
  constructor(private systemService:SystemService, private shopService:ShopService, private translate:TranslateService) { }

   searchInput = document.getElementById('search-inp');
   searchNav = document.getElementById('search-nav');
   
  ngOnInit() {

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

  displayRightSidebar(){
    this.shopService.isShopSidebarActive.next(true);
    console.log('dislay sidebar products service', this.shopService.isShopSidebarActive.value)
  }
}
