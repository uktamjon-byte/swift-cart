import { Injectable } from '@angular/core';
import { AdminLoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  constructor(private auth: AdminLoginService) {}

  has(permission: number): boolean {
    return this.auth.getPermissions().includes(permission);
  }

  hasAny(perms: number[]): boolean {
    return perms.some((p) => this.has(p));
  }

  hasAll(perms: number[]): boolean {
    return perms.every((p) => this.has(p));
  }
}
