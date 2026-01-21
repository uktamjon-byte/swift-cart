import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import { IPermission } from '../types/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  public savedPermissions = new BehaviorSubject<IPermission[]>([]);
  constructor(private http: HttpClient) {
    this.getPermissions();
  }

  getPermissions(): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: IPermission[] }>(
        constants.baseUrl + '/user/permission'
      )
      .pipe(
        tap((response) => {
          this.savedPermissions.next(response.data);
        })
      );
  }

  getPermissionById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/user/permission/${id}`);
  }

  deletePermission(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/user/permission/${id}`);
  }

  postPermission(data: IPermission): Observable<any> {
    return this.http.post(constants.baseUrl + '/user/permissions', data);
  }

  updatePermission(id: number | null, data: IPermission): Observable<any> {
    return this.http.put(constants.baseUrl + `/user/permission/${id}`, data);
  }
}
