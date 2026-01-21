import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import { ITag } from '../types/interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostCommentService {
  constructor(private http: HttpClient) {}

  getPostComments(id: number): Observable<any> {
    return this.http.get<{ success: boolean; message: string; data: any }>(
      constants.baseUrl + `/blog/comments/admin/${id}`
    );
  }

  getCommentById(id: number): Observable<any> {
    return this.http.get(
      `${constants.baseUrl}/blog/comments/admin/${id}/detail`
    );
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/blog/comments/${id}`);
  }

  postTag(data: FormData): Observable<any> {
    return this.http.post(constants.baseUrl + '/blog/comment', data);
  }

  updateComment(id: number | null, data: any): Observable<any> {
    return this.http.put(constants.baseUrl + `/blog/comments/${id}`, data);
  }
}
