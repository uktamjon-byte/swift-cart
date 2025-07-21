import { Component, OnInit, Renderer2 } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ICategories } from '../intefaces/category';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {
  isToggledSidebar: boolean = false;
  isResizedSidebar: boolean = false;
  isParent: boolean = false;
  isSidebarCollapsed = false;
  isFloatingPopup = false;

  categories: ICategories[] = [
    {
      name: 'sidebarDashboard',
      id: 1,
      isParent: false,
      icon: 'fa-solid fa-gauge',
      isOpen: false,
    },
    {
      name: 'sidebarProducts',
      id: 2,
      isParent: true,
      icon: 'fa-solid fa-cube',
      isOpen: false,
      subcategories: [
        { name: 'sidebarCreateProduct', id: 1 },
        { name: 'sidebarAllProducts', id: 2 },
        { name: 'sidebarCategories', id: 3 },
        { name: 'sidebarBrands', id: 4 },
        { name: 'sidebarAttributes', id: 5 },
        { name: 'sidebarAttributeSets', id: 6 },
        { name: 'sidebarVariations', id: 7 },
        { name: 'sidebarOptions', id: 1 },
        { name: 'sidebarTags', id: 8 },
        { name: 'sidebarReviews', id: 9 },
      ],
    },
    {
      name: 'sidebarSales',
      id: 3,
      isParent: false,
      icon: 'fa-solid fa-dollar-sign',
      isOpen: false,
    },
    {
      name: 'sidebarFlashSales',
      id: 4,
      isParent: false,
      icon: 'fa-solid fa-bolt',
      isOpen: false,
    },
    {
      name: 'sidebarCoupons',
      id: 5,
      isParent: false,
      icon: 'fa-solid fa-tag',
      isOpen: false,
    },
    {
      name: 'sidebarPages',
      id: 6,
      isParent: false,
      icon: 'fa-solid fa-file',
      isOpen: false,
    },
    {
      name: 'sidebarMenus',
      id: 7,
      isParent: false,
      icon: 'fa-solid fa-bars',
      isOpen: false,
    },
    {
      name: 'sidebarBlog',
      id: 8,
      isParent: false,
      icon: 'fa-solid fa-book',
      isOpen: false,
    },
    {
      name: 'sidebarImport',
      id: 9,
      isParent: false,
      icon: 'fa-solid fa-download',
      isOpen: false,
    },
    {
      name: 'sidebarMedia',
      id: 10,
      isParent: false,
      icon: 'fa-solid fa-camera-retro',
      isOpen: false,
    },
    {
      name: 'sidebarUsers',
      id: 11,
      isParent: true,
      icon: 'fa-solid fa-users',
      isOpen: false,
      subcategories: [
        { name: 'sidebarUsersList', id: 1 },
        { name: 'sidebarRoles', id: 2 },
      ],
    },
    {
      name: 'sidebarLocalization',
      id: 12,
      isParent: true,
      icon: 'fa-solid fa-earth-americas',
      isOpen: false,
      subcategories: [
        { name: 'sidebarLanguage', id: 1 },
        { name: 'sidebarCurrencyRates', id: 2 },
        { name: 'sidebarTaxes', id: 3 },
      ],
    },
    {
      name: 'sidebarTools',
      id: 13,
      isParent: false,
      icon: 'fa-solid fa-wrench',
      isOpen: false,
    },
    {
      name: 'sidebarReports',
      id: 14,
      isParent: false,
      icon: 'fa-solid fa-chart-simple',
      isOpen: false,
    },
    {
      name: 'sidebarSettings',
      id: 15,
      isParent: false,
      icon: 'fa-solid fa-gears',
      isOpen: false,
    },
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.toggleSidebar.subscribe((val) => {
      this.isToggledSidebar = val;
      if (!val) {
        setTimeout(() => {
          this.isFloatingPopup = val;
        }, 1000);
      } else {
        this.isFloatingPopup = val;
      }

      console.log('val', val);
    });
  }

  toggleSubmenu(category: ICategories) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === category.id) {
        continue;
      }
      this.categories[i].isOpen = false;
    }

    if (category.isParent) {
      category.isOpen = !category.isOpen;
      console.log('open', category.isOpen);
    } else {
      // only click  - (navigate)
    }
  }
}
