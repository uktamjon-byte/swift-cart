import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import { ITag } from '../types/interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: ITag }>(
      constants.baseUrl + '/blog/tags/admin'
    );
  }

  getTagById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/blog/tags/admin/${id}`);
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/blog/tags/${id}`);
  }

  postTag(data: FormData): Observable<any> {
    return this.http.post(constants.baseUrl + '/blog/tags', data);
  }

  updateTag(id: number | null, data: ITag): Observable<any> {
    return this.http.put(constants.baseUrl + `/blog/tags/${id}`, data);
  }
}
