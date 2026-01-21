import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import { IPermission, IRole } from '../types/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: IRole[] }>(
      constants.baseUrl + '/user/role'
    );
  }

  getRolesById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/user/role/${id}`);
  }

  deleteRoles(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/user/role/${id}`);
  }

  postRoles(data: IRole): Observable<any> {
    return this.http.post(constants.baseUrl + '/user/role', data);
  }

  updateRoles(id: number | null, data: IRole): Observable<any> {
    return this.http.put(constants.baseUrl + `/user/role/${id}`, data);
  }
}
