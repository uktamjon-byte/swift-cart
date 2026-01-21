import { Component, OnInit, Renderer2 } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ICategories } from '../intefaces/category';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ICategory } from 'src/app/store/system/modules/shared/types/interfaces';
import { permissions } from 'src/app/constants/permissions';
import { LoginService } from 'src/app/store/auth/services/login.service';
import { AdminLoginService } from 'src/app/admin/admin-auth/services/login.service';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';

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
  filteredCategories: ICategories[] = [];

  categories: ICategories[] = [
    {
      name: 'sidebarDashboard',
      id: 1,
      isParent: false,
      icon: 'fa-solid fa-gauge',
      isOpen: false,
      link: '/admin/dashboard',
      pattern: 'dashboard',
      permission: permissions.dashboardInfo,
    },
    {
      name: 'sidebarProducts',
      id: 2,
      isParent: true,
      icon: 'fa-solid fa-cube',
      isOpen: false,
      link: '/admin/products',
      pattern: 'product',
      permission: permissions.productRead,
      subcategories: [
        {
          name: 'sidebarCreateProduct',
          id: 1,
          subLink: '/admin/product/create',
          permission: permissions.productCreate,
        },
        {
          name: 'sidebarAllProducts',
          id: 2,
          subLink: '/admin/product/list',
          permission: permissions.productRead,
        },
        {
          name: 'sidebarCategories',
          id: 3,
          subLink: '/admin/product/categories',
          permission: permissions.categoryRead,
        },
        {
          name: 'sidebarBrands',
          id: 4,
          subLink: '/admin/product/brand',
          permission: permissions.blogRead,
        },
        { name: 'sidebarTags', id: 9, subLink: '/admin/product/tag' },
        { name: 'sidebarReviews', id: 10, subLink: '/admin/product/review' },
      ],
    },
    {
      name: 'sidebarSales',
      id: 3,
      isParent: true,
      icon: 'fa-solid fa-dollar-sign',
      isOpen: false,
      link: '/admin/sales/order',
      pattern: 'sales',
      permission: permissions.orderRead,
      subcategories: [
        {
          name: 'sidebarOrders',
          id: 1,
          subLink: '/admin/sales/order',
          permission: permissions.orderRead,
        },
      ],
    },
    {
      name: 'sidebarFlashSales',
      id: 4,
      isParent: false,
      icon: 'fa-solid fa-bolt',
      isOpen: false,
      link: '/admin/flashsales',
      pattern: 'flashsales',
    },
    {
      name: 'sidebarCoupons',
      id: 5,
      isParent: false,
      icon: 'fa-solid fa-tag',
      isOpen: false,
      link: '/admin/coupons',
      pattern: 'coupons',
    },
    {
      name: 'sidebarPages',
      id: 6,
      isParent: true,
      icon: 'fa-solid fa-file',
      isOpen: false,
      link: '/admin/pages',
      pattern: 'pages',
      permission: permissions.customerQuestionRead,
      subcategories: [
        { name: 'userRequest', id: 1, subLink: '/admin/pages/user/request' },
        {
          name: 'faq',
          id: 2,
          subLink: '/admin/pages/faq',
          permission: permissions.faqRead,
        },
      ],
    },
    {
      name: 'sidebarMenus',
      id: 7,
      isParent: false,
      icon: 'fa-solid fa-bars',
      isOpen: false,
      link: '/admin/menu',
      pattern: 'menu',
    },
    {
      name: 'sidebarBlog',
      id: 8,
      isParent: true,
      icon: 'fa-solid fa-book',
      isOpen: false,
      link: '/admin/blog/category',
      pattern: 'blog',
      permission: permissions.blogRead,
      subcategories: [
        {
          name: 'posts',
          id: 1,
          subLink: '/admin/blog/post',
          permission: permissions.blogRead,
        },
        {
          name: 'tags',
          id: 2,
          subLink: '/admin/blog/tag',
          permission: permissions.blogTagRead,
        },
      ],
    },
    {
      name: 'sidebarImport',
      id: 9,
      isParent: false,
      icon: 'fa-solid fa-download',
      isOpen: false,
      link: '/admin/import',
      pattern: 'import',
    },
    {
      name: 'sidebarMedia',
      id: 10,
      isParent: false,
      icon: 'fa-solid fa-camera-retro',
      isOpen: false,
      link: '/admin/media',
      pattern: 'media',
      permission: permissions.mediaRead,
    },
    {
      name: 'sidebarUsers',
      id: 11,
      isParent: true,
      icon: 'fa-solid fa-users',
      isOpen: false,
      link: '/admin/users',
      pattern: 'users',
      permission: permissions.userRead,
      subcategories: [
        {
          name: 'sidebarUsers',
          id: 1,
          subLink: '/admin/users/list',
          permission: permissions.userRead,
        },
        {
          name: 'sidebarRoles',
          id: 2,
          subLink: '/admin/users/roles',
          permission: permissions.roleRead,
        },
        {
          name: 'permissions',
          id: 3,
          subLink: '/admin/users/permissions',
          permission: permissions.permissionRead,
        },
      ],
    },
    {
      name: 'sidebarLocalization',
      id: 12,
      isParent: true,
      icon: 'fa-solid fa-earth-americas',
      isOpen: false,
      link: '/admin/localization',
      pattern: 'localization',
      subcategories: [
        {
          name: 'sidebarLanguage',
          id: 1,
          subLink: '/admin/localization/language',
        },
        {
          name: 'sidebarCurrencyRates',
          id: 2,
          subLink: '/localization/currency',
        },
        { name: 'sidebarTaxes', id: 3, subLink: '/admin/localization/taxes' },
        {
          name: 'blog',
          id: 1,
          subLink: '/adminlocalization/edit/:id',
          visible: false,
        },
      ],
    },
    {
      name: 'sidebarTools',
      id: 13,
      isParent: true,
      icon: 'fa-solid fa-wrench',
      isOpen: false,
      link: '/admin/tools',
      pattern: 'tools',
      permission: permissions.countryRead,
      subcategories: [
        {
          name: 'countries',
          id: 1,
          subLink: '/admin/tools/countries',
          permission: permissions.countryRead,
        },
      ],
    },
    {
      name: 'sidebarReports',
      id: 14,
      isParent: false,
      icon: 'fa-solid fa-chart-simple',
      isOpen: false,
      link: '/admin/reports',
      pattern: 'reports',
    },
    {
      name: 'sidebarSettings',
      id: 15,
      isParent: false,
      icon: 'fa-solid fa-gears',
      isOpen: false,
      link: '/admin/settings',
      pattern: 'settings',
    },
  ];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private permission: PermissionsService
  ) {}

  ngOnInit() {
    this.filteredCategories = this.filterCategories(this.categories);
    console.log('filter catergo', this.filteredCategories);
    console.log('original catergo', this.categories);
    this.currentUrl = this.router.url;
    this.currentSegment = this.currentUrl.split('/')[2];
    this.openParentsFor(this.currentUrl);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.urlAfterRedirects;
        const [, firstSegment, secondSegment] = this.currentUrl.split('/');
        this.currentSegment = secondSegment;
        this.filteredCategories.forEach((category) => {
          if (secondSegment === category.pattern) {
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

  filterCategories(categories: ICategories[]): ICategories[] {
    return categories
      .map((category) => {
        const cat = { ...category };

        if (cat.subcategories?.length) {
          cat.subcategories = cat.subcategories.filter(
            (sub) => !sub.permission || this.permission.has(sub.permission)
          );
        }

        const hasVisibleChildren =
          !!cat.subcategories && cat.subcategories.length > 0;

        const hasPermission =
          !cat.permission || this.permission.has(cat.permission);

        // non-parent
        if (!cat.isParent) {
          return hasPermission ? cat : null;
        }

        // parent (FIX HERE)
        return hasPermission || hasVisibleChildren ? cat : null;
      })
      .filter(Boolean) as ICategories[];
  }

  openParentsFor(url: string) {
    console.log('openparent url', url);
    this.filteredCategories.forEach((category) => {
      if (category.subcategories?.some((sub) => url.includes(sub.subLink))) {
        category.isOpen = true;
      } else {
        category.isOpen = false;
      }
    });
  }

  isActive(category: ICategories): boolean {
    return this.currentSegment === category.pattern;
  }

  toggleSubmenu(category: ICategories) {
    this.isActive(category);
    for (let i = 0; i < this.filteredCategories.length; i++) {
      if (category.id)
        if (this.filteredCategories[i].id === category.id) {
          continue;
        }
      this.filteredCategories[i].isOpen = false;
    }
    if (category.isParent) {
      category.isOpen = !category.isOpen;
    } else {
      this.router.navigate([category.link]);
    }
  }
}
