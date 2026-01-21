import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import {
  IAdminUser,
  IPermission,
  IRole,
} from '../../types/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';
import { constants } from 'src/app/constants/constants';
import { DisplayContent } from '../../types/enums/user.enum';
import { ContentReadyEvent } from 'devextreme/ui/data_grid';
import { AdminAuthService } from 'src/app/admin/admin-auth/services/admin-auth.service';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { permissions } from 'src/app/constants/permissions';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  resetPasswordType: string = 'password';
  resetComfirmPasswordType: string = 'password';
  passwordType: string = 'password';
  comfirmPasswordType: string = 'password';
  isImageSelected: boolean = false;
  id: number | null = null;
  comfirmPassword!: string;
  isIdentical: boolean = false;
  savedPassword: string | null = null;
  isSaving: boolean = false;
  isEdit: boolean = false;
  roles!: IRole[];
  editableUser!: IAdminUser;
  selectedRole!: any;
  editableImage: string | null = null;
  defaultImage: string =
    '../../../../../../../assets/imagis/download-file-image.png';
  selectedImage: any = null;
  isImageLoaded: boolean = false;
  selectedFile!: File;
  isImageReselected: boolean = false;
  currentContentState: string = DisplayContent.account;
  DisplayContent = DisplayContent;
  private destroy$ = new Subject<void>();
  activePanelId = 1;
  @ViewChild('fileInput') fileInput!: ElementRef;
  collapsed: any;
  selectedRowKeys: number[] = [];
  userPermissions: IPermission[] = [];
  showBackDrop: boolean = false;
  permissions = permissions;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private notifyServiceMessage: NotifyServiceMessage,
    private router: Router,
    private adminService: AdminService,
    public permission: PermissionsService
  ) {}

  ngOnInit() {
    const savedPanelId = localStorage.getItem('activePanelId');
    if (savedPanelId) {
      const id = Number(savedPanelId);
      this.changeContent(id);
    } else {
      this.changeContent(1);
    }
    this.roleService
      .getRoles()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading roles, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.roles = res.data;
          console.log('role locals', this.roles);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Roles not found',
            NotifyMessageType.error
          );
        }
      });
    this.userForm = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        isActive: new FormControl(false),
        roleId: new FormControl(null, Validators.required),
        comfirm: new FormControl('', Validators.required),
        image: new FormControl(null, Validators.required),
      },
      { validators: this.passwordsMatchValidator }
    );

    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.resetPasswordMatchValidator }
    );

    this.userForm.get('password')?.valueChanges.subscribe((value) => {
      this.savedPassword = value;
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];

      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
        this.isEdit = true;
        if (!this.isImageReselected) {
          this.userForm.get('image')?.clearValidators();
        }
        this.userForm.get('password')?.clearValidators();
        this.userForm.removeControl('password');
        this.userForm.removeControl('comfirm');
        (this.userForm as FormGroup).setValidators(null);
        this.userForm.updateValueAndValidity();
        this.userService
          .getUserById(this.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              this.notifyServiceMessage.opeSnackBar(
                'Something went wrong uploading editable user, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            if (!res) return;
            console.log('edit user', res);
            this.editableUser = res.data;
            this.userPermissions = res.data.role.permissions;
            if (this.editableUser.image) {
              this.isImageSelected = true;
              this.selectedImage = this.editableUser.image;
              this.isImageLoaded = true;
            }

            this.userForm.patchValue({
              firstName: this.editableUser?.firstName,
              lastName: this.editableUser?.lastName,
              email: this.editableUser.email,
              isActive: this.editableUser.isActive,
              roleId: this.editableUser.roleId,
            });
          });
      } else {
      }
    });
  }

  preventUncheck(e: any) {
    if (
      e.currentSelectedRowKeys.length <
      e.component.option('userPermissions').length
    ) {
      e.cancel = true;
    }
  }

  resetPasswordMatchValidator(group: any) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  changeContent(id: number) {
    this.activePanelId = id;
    localStorage.setItem('activePanelId', id.toString());

    switch (id) {
      case 1:
        this.currentContentState = this.DisplayContent.account;
        break;
      case 2:
        this.currentContentState = this.DisplayContent.permissions;
        break;
      case 3:
        if (this.permission.has(permissions.userResetPassword)) {
          this.currentContentState = this.DisplayContent.password;
        } else {
          this.router.navigate(['/401']);
        }
        break;
    }
  }

  panelNames = [
    { title: 'accountText', id: 1, editOnly: false },
    { title: 'permissions', id: 2, editOnly: true },
    { title: 'newPassword', id: 3, editOnly: true },
  ];

  items = [
    {
      id: 1,
      name: 'Create User',
      description: 'Creates a new user in the system',
      code: 'CREATE_USER',
    },
    {
      id: 2,
      name: 'Update User',
      description: 'Updates existing user information',
      code: 'UPDATE_USER',
    },
    {
      id: 3,
      name: 'Delete User',
      description: 'Removes a user from the system',
      code: 'DELETE_USER',
    },
    {
      id: 4,
      name: 'View User',
      description: 'Retrieves user details',
      code: 'VIEW_USER',
    },
  ];

  get visiblePanels() {
    return this.panelNames.filter((panel) => this.isEdit || !panel.editOnly);
  }

  contentReady = (e: ContentReadyEvent) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
    if (!this.selectedRowKeys.length && this.userPermissions?.length) {
      this.selectedRowKeys = this.userPermissions.map((item) => item.id);
    }
  };

  get imageToShow() {
    if (this.isEdit) {
      if (!this.selectedImage) return this.defaultImage;
      if (
        typeof this.selectedImage === 'string' &&
        !this.selectedImage.startsWith('data:image')
      ) {
        return this.getUrl + this.selectedImage;
      }
      return this.selectedImage;
    }

    return this.isImageLoaded ? this.selectedImage : this.defaultImage;
  }

  passwordsMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirm = group.get('comfirm')?.value;

    return password === confirm ? null : { notMatching: true };
  }

  get getUrl() {
    return constants.baseUrlServer;
  }

  onFileSelected(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    this.isImageReselected = true;
    this.isImageLoaded = true;
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => (this.selectedImage = reader.result);
    reader.readAsDataURL(file);

    // update form
    this.userForm.patchValue({ image: file });
    this.userForm.get('image')?.updateValueAndValidity();
    e.target.value = null;
  }

  removeImage($event: MouseEvent) {
    $event.stopPropagation();
    this.isImageLoaded = false;
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
    this.selectedImage = null;
    this.selectedFile = null as any;
    this.userForm.get('image')?.reset();
  }

  onPasswordChange(event: Event) {
    this.comfirmPassword = (event.target as HTMLInputElement).value;
    this.isIdentical = this.comfirmPassword === this.savedPassword;
  }

  saveUser() {
    this.isSaving = true;
    const formData = new FormData();
    const { firstName, lastName, email, password, isActive, roleId, image } =
      this.userForm.value;
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('isActive', isActive ? 'true' : 'false');
    formData.append('roleId', String(roleId));
    if (!this.isEdit) {
      formData.append('password', password);
      formData.append('image', this.selectedFile); // required in create
      this.createUser(formData);
      return;
    }
    if (this.isImageReselected && this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      this.userForm.removeControl('image');
      this.userForm.get('image')?.clearValidators();
      this.userForm.get('image')?.updateValueAndValidity();
    }
    this.editUser(this.id, formData);
  }

  createUser(data: FormData) {
    this.userService
      .postUser(data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          if (e.status === 409) {
            this.notifyServiceMessage.opeSnackBar(
              'User with this email already exists',
              NotifyMessageType.error
            );
          } else {
            this.notifyServiceMessage.opeSnackBar(
              'Something went wrong while creating new user, please try again later',
              NotifyMessageType.error
            );
          }
          this.adminService.stopLoader.next(true);

          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          setTimeout(() => {
            this.notifyServiceMessage.opeSnackBar(
              'User has been created successfully',
              NotifyMessageType.notify
            );
            this.userForm.reset();
            this.router.navigate(['/admin/users/list']);
          }, 2000);
        } else {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Failed to create new user!',
            NotifyMessageType.notify
          );
        }
      });
  }

  editUser(id: number | null, data: FormData) {
    data.delete('email');
    this.userService
      .updateUser(id, data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          if (e.status === 409) {
            this.notifyServiceMessage.opeSnackBar(
              'User with this password already exists',
              NotifyMessageType.error
            );
          } else {
            this.notifyServiceMessage.opeSnackBar(
              'Something went wrong while editing new user, please try again later',
              NotifyMessageType.error
            );
          }
          this.adminService.stopLoader.next(true);
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          console.log('user edited', res.data);
          const userId = localStorage.getItem('userId');
          // to do get update permission of a current user
          // if (res.data.user.id === userId) {
          //   this.adminAuth.refreshToken().subscribe((res) => {
          //     console.log('refresh res', res);
          //   });
          // }

          setTimeout(() => {
            this.notifyServiceMessage.opeSnackBar(
              'User has been updated successfully',
              NotifyMessageType.notify
            );
            this.userForm.reset();
            this.router.navigate(['/admin/users/list']);
          }, 2000);
        } else {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Failed to edit a user!',
            NotifyMessageType.error
          );
        }
      });
  }

  savePassword() {
    this.showBackDrop = true;
    this.userService
      .updateUserPassword(this.id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.showBackDrop = false;
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while updating user password, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.notifyServiceMessage.opeSnackBar(
            'Password has been updated successfully',
            NotifyMessageType.notify
          );
          this.router.navigate(['/admin/users/list']);
        } else {
          this.showBackDrop = false;
          this.notifyServiceMessage.opeSnackBar(
            'Failed to update password',
            NotifyMessageType.error
          );
        }
      });
  }

  cancel() {
    this.userForm.reset();
    this.router.navigate(['/admin/users/list']);
  }

  ngOnDestroy(): void {
    const one = 1;
    localStorage.setItem('activePanelId', one.toString());
    this.destroy$.next();
    this.destroy$.complete();
  }
}
