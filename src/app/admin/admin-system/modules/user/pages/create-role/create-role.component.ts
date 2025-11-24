import { Component, OnInit } from '@angular/core';
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
export class CreateRoleComponent implements OnInit {
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
      permissionIds: new FormControl([], Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
        this.roleService.savedRoles
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
            if (res) {
              const editableRole = res.find((role) => role.id === this.id);

              this.editablePermissions = editableRole?.permissions;
              console.log('roles p', res);
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
    console.log('selected per', this.selectedPermissions);
  }

  onSubmit() {
    this.roleForm.get('permissionIds')?.setValue(this.selectedPermissions);
    console.log('roles', this.roleForm.value);
    if (!this.isEdit) {
      this.roleService
        .postRoles(this.roleForm.value)
        .pipe(
          takeUntil(this.destroy$),
          catchError((e) => {
            this.notifyServiceMessage.opeSnackBar(
              'Something went wrong, please try again later',
              NotifyMessageType.error
            );
            this.adminService.stopLoader.next(true);
            return EMPTY;
          }),
          finalize(() => {
            this.adminService.stopLoader.next(true);
          })
        )
        .subscribe((response) => {
          if (response.success) {
            console.log('res roles data', response.data);
            setTimeout(() => {
              this.isSaving = false;
              this.notifyServiceMessage.opeSnackBar(
                'Roles has been created successfully',
                NotifyMessageType.notify
              );
              this.roleForm.reset();
              this.router.navigate(['users/roles']);
            }, 2000);
          }
        });
    } else {
      this.roleService
        .updateRoles(this.id, this.roleForm.value)
        .pipe(
          takeUntil(this.destroy$),
          catchError((e) => {
            this.notifyServiceMessage.opeSnackBar(
              'Something went wrong, please try again later',
              NotifyMessageType.error
            );
            this.isSaving = true;
            return EMPTY;
          }),
          finalize(() => {
            this.adminService.stopLoader.next(true);
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
              this.router.navigate(['users/roles']);
            }, 2000);
          } else {
            this.notifyServiceMessage.opeSnackBar(
              res.message,
              NotifyMessageType.notify
            );
          }
        });
    }
    console.log('form', this.roleForm.value);
  }

  saveRole() {
    this.onSubmit();
  }

  cancelEdit() {
    this.roleForm.reset();
    this.router.navigate(['users/roles']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
