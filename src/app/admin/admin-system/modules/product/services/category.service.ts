import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import {
  IBrand,
  IProductCategory,
} from '../types/interfaces/product.interface';
import { ICategory } from 'src/app/store/system/modules/shared/types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(
      constants.baseUrl + '/product/category/admin'
    );
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/product/category/admin/${id}`);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/product/category/${id}`);
  }

  postCategory(data: IProductCategory): Observable<any> {
    return this.http.post(constants.baseUrl + '/product/category', data);
  }

  updateCategory(id: number | null, data: IProductCategory): Observable<any> {
    return this.http.put(constants.baseUrl + `/product/category/${id}`, data);
  }
}
