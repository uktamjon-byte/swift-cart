import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import {
  catchError,
  debounceTime,
  EMPTY,
  finalize,
  Subject,
  takeUntil,
} from 'rxjs';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { IPermission } from '../../types/interfaces/user.interface';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss'],
})
export class CreatePermissionComponent implements OnInit, OnDestroy {
  permissionForm!: FormGroup;
  mainTitle: string = 'createPermission';
  isSaving: boolean = false;
  id: number | null = null;
  isEdit: boolean = false;
  public codes: any = [];
  isCodeExist: boolean = false;
  codeInput$ = new Subject<number>();
  editablePermissions: IPermission[] = [];
  editablePermission: any;
  private destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private notifyServiceMessage: NotifyServiceMessage,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.codeInput$.pipe(debounceTime(2000)).subscribe((value) => {
      const found = this.codes.find((code: any) => code === value);
      if (found) {
        this.isCodeExist = true;
      } else {
        this.isCodeExist = false;
      }
    });

    this.permissionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id !== null && !isNaN(this.id)) {
        this.isEdit = true;
        this.mainTitle = 'editPermission';
        this.permissionService
          .getPermissionById(this.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              e.cancel = true;
              this.notifyServiceMessage.opeSnackBar(
                'Editable permission has not been uploaded, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            console.log('res permission', res);
            if (res.data.id === this.id) {
              this.editablePermission = res.data;
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Editable permission has not been uploaded, please try again later',
                NotifyMessageType.error
              );
            }

            if (this.editablePermission) {
              this.permissionForm.patchValue({
                name: this.editablePermission.name,
                description: this.editablePermission.description,
                code: this.editablePermission.code,
              });
              this.permissionForm.controls['code'].disable();
            }
          });
      }
    });

    this.permissionService
      .getPermissions()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Codes have not been uploaded, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((data) => {
        if (data.success) {
          data.data.map((item: IPermission) => this.codes.push(item.code));
        } else {
          this.notifyServiceMessage.opeSnackBar(
            data.message,
            NotifyMessageType.error
          );
        }
      });
  }

  savePermissions() {
    this.isSaving = true;
    if (!this.isEdit) {
      this.permissionService
        .postPermission(this.permissionForm.value)
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
        .subscribe((data) => {
          if (data.success) {
            setTimeout(() => {
              this.notifyServiceMessage.opeSnackBar(
                'New permission has been created successfully',
                NotifyMessageType.notify
              );
              this.permissionForm.reset();
              this.router.navigate(['/admin/users/permissions']);
            }, 3000);
          } else {
            this.notifyServiceMessage.opeSnackBar(
              data.message,
              NotifyMessageType.error
            );
          }
        });
    } else {
      this.permissionService
        .updatePermission(this.id, this.permissionForm.value)
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
        .subscribe((data) => {
          if (data.success) {
            setTimeout(() => {
              this.notifyServiceMessage.opeSnackBar(
                'Permission has been updated successfully',
                NotifyMessageType.notify
              );
              this.permissionForm.reset();
              this.router.navigate(['/admin/users/permissions']);
            }, 2000);
          } else {
            this.notifyServiceMessage.opeSnackBar(
              data.message,
              NotifyMessageType.notify
            );
          }
        });
    }
  }

  cancel() {
    this.permissionForm.reset();
    this.router.navigate(['/admin/users/permissions']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCodeChange(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.codeInput$.next(value);
  }
}
