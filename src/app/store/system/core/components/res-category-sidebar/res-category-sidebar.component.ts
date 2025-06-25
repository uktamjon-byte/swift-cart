import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SystemService } from 'src/app/store/system/core/services/system.service';
import { navMenuType } from '../../types/system.enum';
@Component({
  selector: 'app-res-category-sidebar',
  templateUrl: './res-category-sidebar.component.html',
  styleUrls: ['./res-category-sidebar.component.scss']
})
export class ResCategorySidebarComponent implements OnInit {
   private $destroy = new Subject<void>();
   buttonContent:string = 'categories';

  constructor(private systemService:SystemService) { }

  categories = [
    {
      name:'categories',
      keyName:'categories'
    },

    {
      name:'menu',
      keyName:'menu'
    },

    {
      name:'more',
      keyName:'more'
    }

  ];

 

navMenu = [
  {
    id: 0,
    categoryName: 'categoryTelevisions',
    icon: 'fa-solid fa-language'
  },
  {
    id: 1,
    categoryName: 'categoryWatches',
    icon: 'fa-solid fa-language'
  },
  {
    id: 2,
    categoryName: 'categoryFashion',
    icon: 'fa-solid fa-language'
  },
  {
    id: 3,
    categoryName: 'categoryBackpacks',
    icon: 'fa-solid fa-language'
  },
  {
    id: 4,
    categoryName: 'categoryTablets',
    icon: 'fa-solid fa-language'
  },
  {
    id: 5,
    categoryName: 'categoryShoes',
    icon: 'fa-solid fa-language'
  },
  {
    id: 6,
    categoryName: 'categoryAll',
    icon: 'fa-solid fa-language'
  }
];


  ngOnInit() {
    this.systemService.triggerSidebar
    .pipe(takeUntil(this.$destroy))
    .subscribe((val)=>{
      if(val===true){
        this.openOffcanvas();
      }
    })
  }

  showMenu(keyName:string){
     this.buttonContent = keyName;
  }

  openOffcanvas(): void {
    const offcanvasElement = document.getElementById('offcanvasWithBothOptions');
    if (offcanvasElement) {
      const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
      offcanvasInstance.show();
    }
  }

  closeCanvas(){
    this.systemService.triggerSidebar.next(false)
  }

  ngOnDestroy(): void {
    // Complete the destroy$ Subject to clean up subscriptions
    this.$destroy.next();
    this.$destroy.complete();
  }

}
