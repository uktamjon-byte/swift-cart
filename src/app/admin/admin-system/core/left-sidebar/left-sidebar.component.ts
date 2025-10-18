import { Component, OnInit, Renderer2 } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ICategories } from '../intefaces/category';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ICategory } from 'src/app/store/system/modules/shared/types/interfaces';

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
  currentUrl: string = '';
  currentSegment: string = '';

  categories: ICategories[] = [
    {
      name: 'sidebarDashboard',
      id: 1,
      isParent: false,
      icon: 'fa-solid fa-gauge',
      isOpen: false,
      link: '/dashboard',
      pattern: 'dashboard',
    },
    {
      name: 'sidebarProducts',
      id: 2,
      isParent: true,
      icon: 'fa-solid fa-cube',
      isOpen: false,
      link: '/products',
      pattern: 'product',
      subcategories: [
        { name: 'sidebarCreateProduct', id: 1, subLink: '/product/create' },
        { name: 'sidebarAllProducts', id: 2, subLink: 'product/list' },
        { name: 'sidebarCategories', id: 3, subLink: '/product/categories' },
        { name: 'sidebarBrands', id: 4, subLink: '/product/brand' },
        { name: 'sidebarAttributes', id: 5, subLink: '/product/attributes' },
        {
          name: 'sidebarAttributeSets',
          id: 6,
          subLink: '/product/attributeSets',
        },
        { name: 'sidebarVariations', id: 7, subLink: '/product/variations' },
        { name: 'sidebarOptions', id: 8, subLink: '/product/options' },
        { name: 'sidebarTags', id: 9, subLink: '/product/tag' },
        { name: 'sidebarReviews', id: 10, subLink: '/product/review' },
      ],
    },
    {
      name: 'sidebarSales',
      id: 3,
      isParent: true,
      icon: 'fa-solid fa-dollar-sign',
      isOpen: false,
      link: '/sales/order',
      pattern: 'sales',
      subcategories: [
        { name: 'sidebarOrders', id: 1, subLink: '/sales/order' },
      ],
    },
    {
      name: 'sidebarFlashSales',
      id: 4,
      isParent: false,
      icon: 'fa-solid fa-bolt',
      isOpen: false,
      link: '/flashsales',
      pattern: 'flashsales',
    },
    {
      name: 'sidebarCoupons',
      id: 5,
      isParent: false,
      icon: 'fa-solid fa-tag',
      isOpen: false,
      link: '/coupons',
      pattern: 'coupons',
    },
    {
      name: 'sidebarPages',
      id: 6,
      isParent: false,
      icon: 'fa-solid fa-file',
      isOpen: false,
      link: '/pages',
      pattern: 'pages',
    },
    {
      name: 'sidebarMenus',
      id: 7,
      isParent: false,
      icon: 'fa-solid fa-bars',
      isOpen: false,
      link: '/menu',
      pattern: 'menu',
    },
    {
      name: 'sidebarBlog',
      id: 8,
      isParent: true,
      icon: 'fa-solid fa-book',
      isOpen: false,
      link: '/blog/category',
      pattern: 'blog',
      subcategories: [
        { name: 'posts', id: 1, subLink: '/blog/post' },
        { name: 'categories', id: 2, subLink: '/blog/category' },
        { name: 'tags', id: 3, subLink: '/blog/tag' },
      ],
    },
    {
      name: 'sidebarImport',
      id: 9,
      isParent: false,
      icon: 'fa-solid fa-download',
      isOpen: false,
      link: '/import',
      pattern: 'import',
    },
    {
      name: 'sidebarMedia',
      id: 10,
      isParent: false,
      icon: 'fa-solid fa-camera-retro',
      isOpen: false,
      link: '/media',
      pattern: 'media',
    },
    {
      name: 'sidebarUsers',
      id: 11,
      isParent: true,
      icon: 'fa-solid fa-users',
      isOpen: false,
      link: '/users',
      pattern: 'users',
      subcategories: [
        { name: 'sidebarUsers', id: 1, subLink: '/users/list' },
        { name: 'sidebarRoles', id: 2, subLink: '/users/roles' },
        { name: 'permissions', id: 3, subLink: '/users/permissions' },
      ],
    },
    {
      name: 'sidebarLocalization',
      id: 12,
      isParent: true,
      icon: 'fa-solid fa-earth-americas',
      isOpen: false,
      link: '/localization',
      pattern: 'localization',
      subcategories: [
        { name: 'sidebarLanguage', id: 1, subLink: '/localization/language' },
        {
          name: 'sidebarCurrencyRates',
          id: 2,
          subLink: '/localization/currency',
        },
        { name: 'sidebarTaxes', id: 3, subLink: '/localization/taxes' },
        {
          name: 'blog',
          id: 1,
          subLink: 'localization/edit/:id',
          visible: false,
        },
      ],
    },
    {
      name: 'sidebarTools',
      id: 13,
      isParent: false,
      icon: 'fa-solid fa-wrench',
      isOpen: false,
      link: '/tools',
      pattern: 'tools',
    },
    {
      name: 'sidebarReports',
      id: 14,
      isParent: false,
      icon: 'fa-solid fa-chart-simple',
      isOpen: false,
      link: '/reports',
      pattern: 'reports',
    },
    {
      name: 'sidebarSettings',
      id: 15,
      isParent: false,
      icon: 'fa-solid fa-gears',
      isOpen: false,
      link: '/settings',
      pattern: 'settings',
    },
  ];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.currentUrl = this.router.url;

    this.openParentsFor(this.currentUrl);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.urlAfterRedirects;
        console.log('url', event.urlAfterRedirects);
        const [, firstSegment] = this.currentUrl.split('/');
        this.currentSegment = firstSegment;
        this.categories.forEach((category) => {
          console.log('irems', firstSegment, category.pattern);
          if (firstSegment === category.pattern) {
            category.isOpen = true;
          }
        });
        this.openParentsFor(this.currentUrl);
      });

    this.adminService.toggleSidebar.subscribe((val) => {
      this.isToggledSidebar = val;
      if (val === false) {
        setTimeout(() => {
          this.isFloatingPopup = val;
        }, 1000);
      } else {
        this.isFloatingPopup = val;
      }
    });
  }

  openParentsFor(url: string) {
    this.categories.forEach((category) => {
      if (category.subcategories?.some((sub) => url.includes(sub.subLink))) {
        category.isOpen = true; // open parent
        console.log('includes');
        console.log('categoru list', this.categories);
      } else {
        category.isOpen = false; // close others (optional)
        console.log('not includes', url);
      }
    });
  }

  isActive(category: ICategories): boolean {
    return this.currentSegment === category.pattern;
  }

  // isCategoryActive(category: ICategories) {
  //   const [, firstSegment] = this.currentUrl.split('/');
  //   console.log('segment of iscategoryactive', firstSegment);
  //   return firstSegment === category.pattern;
  // }

  toggleSubmenu(category: ICategories) {
    for (let i = 0; i < this.categories.length; i++) {
      if (category.id)
        if (this.categories[i].id === category.id) {
          continue;
        }
      this.categories[i].isOpen = false;
    }
    if (category.isParent) {
      category.isOpen = !category.isOpen;
    } else {
      // only click  - (navigate)
      this.router.navigate([category.link]);
    }
  }
}
