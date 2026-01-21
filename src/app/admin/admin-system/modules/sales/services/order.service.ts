import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get(constants.baseUrl + '/order/admin');
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/order/admin/${id}`);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/order/${id}`);
  }

  postOrder(data: any): Observable<any> {
    return this.http.post(constants.baseUrl + '/order', data);
  }

  updateOrder(id: number | null, data: any): Observable<any> {
    return this.http.put(constants.baseUrl + `/order/${id}`, data);
  }
}
