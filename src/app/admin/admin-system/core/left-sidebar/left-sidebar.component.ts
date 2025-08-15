import { Component, OnInit, Renderer2 } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ICategories } from '../intefaces/category';
import { Router } from '@angular/router';

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
      link: '/dashboard',
    },
    {
      name: 'sidebarProducts',
      id: 2,
      isParent: true,
      icon: 'fa-solid fa-cube',
      isOpen: false,
      link: '/products',
      subcategories: [
        { name: 'sidebarCreateProduct', id: 1, subLink: '/product/create' },
        { name: 'sidebarAllProducts', id: 2, subLink: '/allProducts' },
        { name: 'sidebarCategories', id: 3, subLink: '/product/categories' },
        { name: 'sidebarBrands', id: 4, subLink: '/product/brand' },
        { name: 'sidebarAttributes', id: 5, subLink: '/product/attributes' },
        {
          name: 'sidebarAttributeSets',
          id: 6,
          subLink: '/product/attributeSets',
        },
        { name: 'sidebarVariations', id: 7, subLink: '/product/variations' },
        { name: 'sidebarOptions', id: 1, subLink: '/product/options' },
        { name: 'sidebarTags', id: 8, subLink: '/product/tags' },
        { name: 'sidebarReviews', id: 9, subLink: '/product/review' },
      ],
    },
    {
      name: 'sidebarSales',
      id: 3,
      isParent: false,
      icon: 'fa-solid fa-dollar-sign',
      isOpen: false,
      link: '/sales',
    },
    {
      name: 'sidebarFlashSales',
      id: 4,
      isParent: false,
      icon: 'fa-solid fa-bolt',
      isOpen: false,
      link: '/flashsales',
    },
    {
      name: 'sidebarCoupons',
      id: 5,
      isParent: false,
      icon: 'fa-solid fa-tag',
      isOpen: false,
      link: '/coupons',
    },
    {
      name: 'sidebarPages',
      id: 6,
      isParent: false,
      icon: 'fa-solid fa-file',
      isOpen: false,
      link: '/pages',
    },
    {
      name: 'sidebarMenus',
      id: 7,
      isParent: false,
      icon: 'fa-solid fa-bars',
      isOpen: false,
      link: '/menu',
    },
    {
      name: 'sidebarBlog',
      id: 8,
      isParent: true,
      icon: 'fa-solid fa-book',
      isOpen: false,
      link: '/blog',
      subcategories: [
        { name: 'posts', id: 1, subLink: '/blog/post' },
        { name: 'categories', id: 2, subLink: '/blog/category' },
        { name: 'tags', id: 3, subLink: 'blog/tag' },
      ],
    },
    {
      name: 'sidebarImport',
      id: 9,
      isParent: false,
      icon: 'fa-solid fa-download',
      isOpen: false,
      link: '/import',
    },
    {
      name: 'sidebarMedia',
      id: 10,
      isParent: false,
      icon: 'fa-solid fa-camera-retro',
      isOpen: false,
      link: '/media',
    },
    {
      name: 'sidebarUsers',
      id: 11,
      isParent: true,
      icon: 'fa-solid fa-users',
      isOpen: false,
      link: '/users',
      subcategories: [
        { name: 'sidebarUsersList', id: 1, subLink: '/users/list' },
        { name: 'sidebarRoles', id: 2, subLink: '/users/roles' },
      ],
    },
    {
      name: 'sidebarLocalization',
      id: 12,
      isParent: true,
      icon: 'fa-solid fa-earth-americas',
      isOpen: false,
      link: '/localization',
      subcategories: [
        { name: 'sidebarLanguage', id: 1, subLink: '/localization/language' },
        {
          name: 'sidebarCurrencyRates',
          id: 2,
          subLink: '/localization/currency',
        },
        { name: 'sidebarTaxes', id: 3, subLink: '/localization/taxes' },
      ],
    },
    {
      name: 'sidebarTools',
      id: 13,
      isParent: false,
      icon: 'fa-solid fa-wrench',
      isOpen: false,
      link: '/tools',
    },
    {
      name: 'sidebarReports',
      id: 14,
      isParent: false,
      icon: 'fa-solid fa-chart-simple',
      isOpen: false,
      link: '/reports',
    },
    {
      name: 'sidebarSettings',
      id: 15,
      isParent: false,
      icon: 'fa-solid fa-gears',
      isOpen: false,
      link: '/settings',
    },
  ];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.adminService.toggleSidebar.subscribe((val) => {
      this.isToggledSidebar = val;
      if (val === false) {
        setTimeout(() => {
          this.isFloatingPopup = val;
          console.log('val false isfloat', this.isFloatingPopup);
        }, 1000);
      } else {
        this.isFloatingPopup = val;
        console.log('val true floarte', this.isFloatingPopup);
      }
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
      this.router.navigate([category.link]);
    }
  }
}
