import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { constants } from 'src/app/constants/constants';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  public toggleSidebar = new BehaviorSubject<boolean>(false);
  public stopLoader = new BehaviorSubject<boolean>(false);
  public isLoggedIn = new BehaviorSubject<boolean>(false);

  logoutUser(): Observable<any> {
    return this.http.get(constants.baseUrl + '/auth/logout');
  }

  getAllMedia(): Observable<any> {
    return this.http.get(constants.baseUrl + '/media');
  }

  deleteMedia(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/media/${id}`);
  }

  postMedia(data: FormData): Observable<any> {
    return this.http.post(constants.baseUrl + '/media', data);
  }
}
