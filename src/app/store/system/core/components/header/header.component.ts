import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SystemService } from '../../services/system.service';
import * as bootstrap from 'bootstrap';
import { placements } from '@popperjs/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit  {
  ngZone: any;

  constructor(private systemService:SystemService) { }

   searchInput = document.getElementById('search-inp');
   searchNav = document.getElementById('search-nav');

  
   

  ngOnInit() {

  } 

  @ViewChild('tooltipContainer', { static: false }) tooltipContainer!: ElementRef;

    ngAfterViewInit() {
        // Initialize tooltips
        const tooltipElements = this.tooltipContainer.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipElements.forEach((tooltipEl: HTMLElement) => {
            new bootstrap.Tooltip(tooltipEl,{
              placement:'top'
            });
          
            const tooltipInstance = new bootstrap.Tooltip(tooltipEl);
            tooltipEl.addEventListener('click', () => {
              tooltipInstance.hide();
          });
        });
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
