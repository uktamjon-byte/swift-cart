import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AdminAuthService } from './admin-auth.service';
import { Router } from '@angular/router';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  constructor(
    private authService: AdminAuthService,
    private router: Router,
    private notifyServiceMessage: NotifyServiceMessage
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/auth/refresh')) {
      return next.handle(request);
    }
    const token = localStorage.getItem('loginToken');
    const authReq = token ? this.addToken(request, token) : request;

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => err);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((res: any) => {
          console.log('refreshing', res);
          this.isRefreshing = false;
          const newAccessToken = res.data.token;
          this.authService.saveTokens(newAccessToken);
          this.refreshTokenSubject.next(newAccessToken);

          return next.handle(this.addToken(request, newAccessToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          console.log('refreshing failed');
          this.notifyServiceMessage.opeSnackBar(
            'Login to get access',
            NotifyMessageType.warning
          );
          this.authService.clearTokens();
          this.router.navigate(['/login']);
          return throwError(() => err);
        })
      );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addToken(request, token!)))
    );
  }
}
