import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from '../services/permission.service';
import { permissions } from 'src/app/constants/permissions';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private permission: PermissionsService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiredPermission = route.data['permission'];
    console.log('required permission', requiredPermission);

    // no permission required → allow
    if (!requiredPermission) {
      return true;
    }

    // permission exists → allow
    if (this.permission.has(requiredPermission)) {
      return true;
    }

    // blocked → redirect
    const redirectMap = [
      { permission: permissions.dashboardInfo, route: '/admin/dashboard' },
      { permission: permissions.productRead, route: '/admin/product' },
      { permission: permissions.mediaRead, route: '/admin/media' },
      { permission: permissions.blogRead, route: '/admin/blog' },
      { permission: permissions.userRead, route: '/admin/users' },
      { permission: permissions.blogTagRead, route: '/admin/blog/tag' },
      { permission: permissions.brandRead, route: '/admin/product/brand' },
      {
        permission: permissions.categoryRead,
        route: '/admin/product/categories',
      },

      { permission: permissions.cityRead, route: '/admin/pages/city' },
      { permission: permissions.countryRead, route: '/admin/pages/country' },
      { permission: permissions.customerQuestionRead, route: '/admin/faq' },
      { permission: permissions.faqRead, route: '/admin/faq' },
      {
        permission: permissions.permissionRead,
        route: '/admin/user/permission',
      },
      { permission: permissions.roleRead, route: '/admin/user/role' },
      { permission: permissions.userRead, route: '/admin/user' },
    ];

    const firstAllowed = redirectMap.find((r) =>
      this.permission.has(r.permission)
    );

    this.router.navigateByUrl(firstAllowed?.route || '/401');
    return false;
  }
}
