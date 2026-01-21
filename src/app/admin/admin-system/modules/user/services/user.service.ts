import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { constants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(
      constants.baseUrl + '/user'
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/user/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/user/${id}`);
  }

  postUser(data: FormData): Observable<any> {
    return this.http.post(constants.baseUrl + '/user', data);
  }

  updateUser(id: number | null, data: FormData): Observable<any> {
    return this.http.put(constants.baseUrl + `/user/${id}`, data);
  }

  updateUserPassword(id: number | null): Observable<any> {
    return this.http.get(constants.baseUrl + `/user/reset-password/${id}`);
  }
}
