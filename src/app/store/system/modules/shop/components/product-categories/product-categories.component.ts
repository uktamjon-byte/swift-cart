import { Component, OnInit, Renderer2 } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ICategory } from '../../../shared/types/interfaces';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
 
  categories:ICategory[]=[]

  constructor( 
    private renderer:Renderer2, 
    private categoriesService:CategoriesService,
  ) { }

  ngOnInit(): void {
    this.categories = this.categoriesService.categories
  }

  showSubcategories($event:Event){
     $event?.stopPropagation();
     const icon = $event.target as HTMLElement;
     console.log('clicked', icon)
     const submenu = icon.parentElement?.querySelector('.submenu');

    if (submenu) {
      if (submenu.classList.contains('open')) {
        this.renderer.removeClass(submenu, 'open');
        this.renderer.removeClass(icon, 'rotate');
      } else {
        this.renderer.addClass(submenu, 'open');
        this.renderer.addClass(icon, 'rotate');
      }
  }
  }
}
