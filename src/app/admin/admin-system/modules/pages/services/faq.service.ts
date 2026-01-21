import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import { IFaq } from '../types/interfaces/pages.interface';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpClient) {}

  getFaq(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(
      constants.baseUrl + '/pages/faq/admin'
    );
  }

  getFaqById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/pages/faq/admin/${id}`);
  }

  deleteFaq(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/pages/faq/${id}`);
  }

  postFaq(data: IFaq): Observable<any> {
    return this.http.post(constants.baseUrl + '/pages/faq', data);
  }

  updateFaq(id: number | null, data: IFaq): Observable<any> {
    return this.http.put(constants.baseUrl + `/pages/faq/${id}`, data);
  }
}
