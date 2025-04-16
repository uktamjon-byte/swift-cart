import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ShopService } from '../../../shared/services/shop.service';

@Component({
  selector: 'app-product-header-filter',
  templateUrl: './product-header-filter.component.html',
  styleUrls: ['./product-header-filter.component.scss']
})
export class ProductHeaderFilterComponent implements OnInit {

  isGridViewActive:boolean = true;
  isListViewActive:boolean = false;

  constructor(private shopService:ShopService) { }
  @ViewChild('tooltipContainer', { static: false }) tooltipContainer!: ElementRef;
  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    const tooltipTriggerList = this.tooltipContainer.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl: Element) => {
      new bootstrap.Tooltip(tooltipTriggerEl); // Works safely in Angular
    });
  }

  toggleSidebar(){
    this.shopService.filterSidebarStatus.next(true); 
  }

  gridView(){
    this.shopService.toggleListView.next(false); 
    this.isGridViewActive = true;
    this.isListViewActive = false;
  }

  listView(){
    this.shopService.toggleListView.next(true); 
    this.isListViewActive = true;
    this.isGridViewActive = false;
  }
}
