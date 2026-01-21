import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { constants } from 'src/app/constants/constants';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private http: HttpClient;
  constructor(private httpBackend: HttpBackend) {
    this.http = new HttpClient(this.httpBackend);
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.get<any>(constants.baseUrl + '/auth/refresh');
  }

  saveTokens(accessToken: string, refreshToken?: string) {
    localStorage.setItem('loginToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  clearTokens() {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('refreshToken');
  }
}
