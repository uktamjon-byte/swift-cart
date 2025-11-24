import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import { IPermission, IRole, IUser } from '../types/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public savedUsers = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {
    this.getUser().subscribe();
    console.log('role service', this.savedUsers.value);
  }

  getUser(): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: any }>(
        constants.baseUrl + '/user'
      )
      .pipe(
        tap((response) => {
          this.savedUsers.next(response.data);
          console.log('user response', response);
        })
      );
  }

  getUsersById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/user/${id}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/user/${id}`);
  }

  postUser(data: FormData): Observable<any> {
    return this.http.post(constants.baseUrl + '/user', data);
  }

  updateUser(id: number | null, data: IPermission): Observable<any> {
    return this.http.put(constants.baseUrl + `/user/${id}`, data);
  }
}
