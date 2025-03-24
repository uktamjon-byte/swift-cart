import { Component, OnDestroy, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ShopService } from '../../services/shop.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-responsive-sidebar-filters',
  templateUrl: './responsive-sidebar-filters.component.html',
  styleUrls: ['./responsive-sidebar-filters.component.scss']
})
export class ResponsiveSidebarFiltersComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<void>();
  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
    console.log('val', this.shopService.filterSidebarStatus.value)
    this.shopService.filterSidebarStatus
    .pipe(takeUntil(this.$destroy))
    .subscribe(val=>{
      console.log('value', val)
      if(val===true){
        console.log('val', val)
        this.openOffcanvas();
      }
    })
  }

  openOffcanvas() {
      const offcanvasElement = document.getElementById('filterProductCanvas');
      if (offcanvasElement) {
        const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
        offcanvasInstance.show();
      }
    }
    ngOnDestroy(): void {
      this.$destroy.next();
      this.$destroy.complete();
    }
}
