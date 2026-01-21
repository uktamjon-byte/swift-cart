import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class UserRequestService {
  constructor(private http: HttpClient) {}

  getUserRequest(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(
      constants.baseUrl + '/pages/customer/care'
    );
  }

  getCitiesById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/tools/city/admin/${id}`);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/tools/city/${id}`);
  }

  postCity(data: any): Observable<any> {
    return this.http.post(constants.baseUrl + '/tools/city/', data);
  }

  updateCity(id: number | null, data: any): Observable<any> {
    return this.http.put(constants.baseUrl + `/tools/city/${id}`, data);
  }
}
