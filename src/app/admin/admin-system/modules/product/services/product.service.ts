import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import {
  IBrand,
  IProduct,
  IProductDetail,
} from '../types/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<{
      success: boolean;
      message: string;
      data: IProductDetail;
    }>(constants.baseUrl + '/product/stock/admin');
  }

  getProductUnits(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(
      constants.baseUrl + '/product/unit/admin'
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/product/stock/admin/${id}`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/product/stock/${id}`);
  }

  postProduct(data: IProduct): Observable<any> {
    return this.http.post(constants.baseUrl + '/product/stock', data);
  }

  updateProduct(id: number | null, data: IProduct): Observable<any> {
    return this.http.put(constants.baseUrl + `/product/stock/${id}`, data);
  }
}
