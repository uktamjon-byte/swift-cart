import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPermission } from '../../types/interfaces/user.interface';
import { PermissionService } from '../../services/permission.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { catchError, EMPTY, finalize, Subject, takeUntil } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { ContentReadyEvent } from 'devextreme/ui/data_grid';
import { RoleService } from '../../services/role.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit, OnDestroy {
  roleForm!: FormGroup;
  id: number | null = null;
  isEdit: boolean = false;
  mainTitle: string = 'createRole';
  selectedPermissions: IPermission[] = [];
  editablePermissions: any;
  isSaving: boolean = false;
  private destroy$ = new Subject<void>();
  collapsed: any;
  permissions: IPermission[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private permissionService: PermissionService,
    private notifyServiceMessage: NotifyServiceMessage,
    private roleService: RoleService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.permissionService
      .getPermissions()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (response.success) {
          this.permissions = response.data;
        }
      });

    this.roleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      permissionIds: new FormControl([]),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id !== null && !isNaN(this.id)) {
        this.roleService
          .getRolesById(this.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              this.notifyServiceMessage.opeSnackBar(
                'Something went wrong, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            if (res.success) {
              const editableRole = res.data;
              this.editablePermissions = editableRole?.permissions;
              this.roleForm.patchValue({
                name: editableRole?.name,
                description: editableRole?.description,
              });
            }
          });

        this.mainTitle = 'editRole';
        this.isEdit = true;
        console.log('edit category');
      }
    });
  }

  contentReady = (e: ContentReadyEvent) => {
    const editableIds = this.editablePermissions.map((p: any) => +p.id);
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }

    if (!this.permissions?.length || !this.editablePermissions?.length) return;
    const grid = e.component;
    const selected = this.permissions.filter((p) => editableIds.includes(p.id));
    this.selectedPermissions = selected.map((item: any) => item.id);
    setTimeout(() => {
      grid.selectRows(
        selected.map((x) => x.id),
        false
      );
    }, 100);
  };

  onSelectionChanged(e: any): void {
    this.selectedPermissions = e.selectedRowsData.map((item: any) => item.id);
  }

  saveRole() {
    this.isSaving = true;
    this.roleForm.get('permissionIds')?.setValue(this.selectedPermissions);
    if (!this.isEdit) {
      this.roleService
        .postRoles(this.roleForm.value)
        .pipe(
          takeUntil(this.destroy$),
          catchError((e) => {
            this.adminService.stopLoader.next(true);
            this.notifyServiceMessage.opeSnackBar(
              'Something went wrong, please try again later',
              NotifyMessageType.error
            );
            this.adminService.stopLoader.next(true);
            return EMPTY;
          })
        )
        .subscribe((response) => {
          if (response.success) {
            setTimeout(() => {
              this.notifyServiceMessage.opeSnackBar(
                'Roles has been created successfully',
                NotifyMessageType.notify
              );
              this.roleForm.reset();
              this.router.navigate(['/admin/users/roles']);
            }, 2000);
          } else {
            this.adminService.stopLoader.next(true);
            this.notifyServiceMessage.opeSnackBar(
              'Failed to update',
              NotifyMessageType.notify
            );
          }
        });
    } else {
      this.roleService
        .updateRoles(this.id, this.roleForm.value)
        .pipe(
          takeUntil(this.destroy$),
          catchError((e) => {
            this.adminService.stopLoader.next(true);
            this.notifyServiceMessage.opeSnackBar(
              'Something went wrong, please try again later',
              NotifyMessageType.error
            );
            return EMPTY;
          })
        )
        .subscribe((res) => {
          if (res.success) {
            setTimeout(() => {
              this.notifyServiceMessage.opeSnackBar(
                'Role has been successfully updated',
                NotifyMessageType.notify
              );
              this.roleForm.reset();
              this.router.navigate(['/admin/users/roles']);
            }, 2000);
          } else {
            this.adminService.stopLoader.next(true);
            this.notifyServiceMessage.opeSnackBar(
              'Failed to update',
              NotifyMessageType.notify
            );
          }
        });
    }
  }

  cancelEdit() {
    this.roleForm.reset();
    this.router.navigate(['/adminusers/roles']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
