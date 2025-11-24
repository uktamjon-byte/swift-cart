import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { catchError, EMPTY, Subject, takeUntil, finalize } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { IRole } from '../../types/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
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
  private destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private notifyServiceMessage: NotifyServiceMessage,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
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
        console.log('role response', res);
        if (res) {
          this.roles = res;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Roles not found',
            NotifyMessageType.error
          );
        }
      });
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      isActive: new FormControl(false, Validators.required),
      roleId: new FormControl(null, Validators.required),
      comfirm: new FormControl('', [Validators.required]),
      image: new FormControl(null, Validators.required),
    });

    this.userForm.get('password')?.valueChanges.subscribe((value) => {
      this.savedPassword = value;
      console.log('savedPassword:', this.savedPassword);
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
      } else {
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const control = this.userForm.get('image');

    if (input.files && input.files.length > 0) {
      this.isImageSelected = true;
      console.log('file', input.files);
      const file = input.files[0];
      this.userForm.patchValue({ image: file });
      this.userForm.get('image')?.updateValueAndValidity();
    }
  }

  onFileBlur(): void {
    this.userForm.get('image')?.markAsTouched();
  }

  removeImage() {
    this.isImageSelected = false;
    this.userForm.patchValue({ image: null });
    this.userForm.get('image')?.markAsTouched();
    this.userForm.get('image')?.updateValueAndValidity();

    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onPasswordChange(event: Event) {
    this.comfirmPassword = (event.target as HTMLInputElement).value;
    this.isIdentical = this.comfirmPassword === this.savedPassword;
  }

  saveUser() {
    const formData = new FormData();
    const {
      comfirm,
      firstName,
      lastName,
      email,
      password,
      isActive,
      roleId,
      image,
      ...formValue
    } = this.userForm.value;
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('isActive', isActive ? 'true' : 'false');
    formData.append('roleId', String(roleId));
    formData.append('image', image);
    console.log(
      'data',
      formData.forEach((v) => console.log('formdata', v))
    );
    this.userService
      .postUser(formData)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong, please try again later',
            NotifyMessageType.error
          );
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
              'User has been created successfully',
              NotifyMessageType.notify
            );
            this.userForm.reset();
            this.router.navigate(['/users/list']);
          }, 2000);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            res.message,
            NotifyMessageType.notify
          );
        }
      });

    console.log('userform', this.userForm.value);
  }

  cancel() {}

  onSubmit() {
    console.log('data', this.userForm.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
