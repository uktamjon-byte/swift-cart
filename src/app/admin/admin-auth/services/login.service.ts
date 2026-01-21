import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { constants } from 'src/app/constants/constants';

@Injectable({ providedIn: 'root' })
export class AdminLoginService {
  public permissions$ = new BehaviorSubject<number[]>([]);
  constructor(private http: HttpClient) {}

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(constants.baseUrl + '/auth/login', data).pipe(
      tap((res) => {
        const token = res.data.token;
        const refreshToken = res.data.refreshToken;
        const userName = res.data.user.firstName;
        const email = res.data.user.email;
        const permissions: any[] = res.data.user.permissions;
        console.log('res', res);

        localStorage.setItem('loginToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userName', userName);
        localStorage.setItem('email', email);
        localStorage.setItem('userPermissions', JSON.stringify(permissions));
        this.permissions$.next(permissions);
        console.log('access permit', this.permissions$.value);
      })
    );
  }

  getPermissions(): number[] {
    return this.permissions$.value.length
      ? this.permissions$.value
      : JSON.parse(localStorage.getItem('userPermissions') || '[]');
  }

  deleteMedia(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `media/${id}`);
  }

  postMedia(data: FormData): Observable<any> {
    return this.http.post(constants.baseUrl + 'media', data);
  }
}
