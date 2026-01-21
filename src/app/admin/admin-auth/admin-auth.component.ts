import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { AdminLoginService } from './services/login.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { AdminService } from '../admin-system/services/admin.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss'],
})
export class AdminAuthComponent implements OnInit {
  adminLoginForm!: FormGroup;
  passwordType: string = 'password';
  showBackDrop: boolean = false;
  constructor(
    private loginService: AdminLoginService,
    private notifyServiceMessage: NotifyServiceMessage,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    console.log('start');
    this.adminService.isLoggedIn.next(false);
    this.adminLoginForm = new FormGroup({
      email: new FormControl('wrerererefm@mail.ru', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('passwordqq', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login() {
    this.showBackDrop = true;
    this.loginService
      .loginUser(this.adminLoginForm.value)
      .pipe(
        catchError((e) => {
          console.log('eror', e.error.message);
          this.notifyServiceMessage.opeSnackBar(
            e.error.message,
            NotifyMessageType.error
          );
          return EMPTY;
        }),
        finalize(() => {
          this.showBackDrop = false;
          console.log('finnly');
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.adminService.isLoggedIn.next(true);
          this.router.navigate(['/admin']);
          const userId = res.data.user.id;
          localStorage.setItem('userId', userId);
          console.log('log response', res);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            res.message,
            NotifyMessageType.error
          );
        }
      });
  }
}
