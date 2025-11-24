import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import { IPermission, IRole } from '../types/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public savedRoles = new BehaviorSubject<IRole[]>([]);
  constructor(private http: HttpClient) {
    this.getRoles().subscribe();
    console.log('role service', this.savedRoles.value);
  }

  getRoles(): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: IRole[] }>(
        constants.baseUrl + '/user/role'
      )
      .pipe(
        tap((response) => {
          this.savedRoles.next(response.data);
          console.log('edit response', response);
        })
      );
  }

  getRolesById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/user/role/${id}`);
  }

  deleteRoles(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/user/role/${id}`);
  }

  postRoles(data: IPermission): Observable<any> {
    return this.http.post(constants.baseUrl + '/user/role', data);
  }

  updateRoles(id: number | null, data: IPermission): Observable<any> {
    return this.http.put(constants.baseUrl + `/user/role/${id}`, data);
  }
}
