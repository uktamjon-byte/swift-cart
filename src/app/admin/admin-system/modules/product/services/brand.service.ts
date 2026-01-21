import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import { IBrand } from '../types/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getBrands(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(
      constants.baseUrl + '/product/brand/admin'
    );
  }

  getBrandById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/product/brand/admin/${id}`);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/product/brand/${id}`);
  }

  postBrand(data: IBrand): Observable<any> {
    return this.http.post(constants.baseUrl + '/product/brand', data);
  }

  updateBrand(id: number | null, data: IBrand): Observable<any> {
    return this.http.put(constants.baseUrl + `/product/brand/${id}`, data);
  }
}
