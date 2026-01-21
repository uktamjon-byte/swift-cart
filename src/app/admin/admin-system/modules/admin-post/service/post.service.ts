import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { constants } from 'src/app/constants/constants';
import { IAdminPost, IPost } from '../types/interfaces/post.interface';

@Injectable({ providedIn: 'root' })
export class PostBlogService {
  private postSource = new BehaviorSubject<any>(null);
  public isFileManagerActive = new BehaviorSubject<boolean>(false);
  public postsSubject = new BehaviorSubject<IAdminPost[]>([]);
  constructor(private http: HttpClient) {
    this.getPosts().subscribe();
  }
  setPost(post: any) {
    this.postSource.next(post);
  }

  getPosts(): Observable<any> {
    return this.http
      .get<{ success: boolean; message: string; data: IAdminPost[] }>(
        constants.baseUrl + '/blog/admin'
      )
      .pipe(
        tap((res) => {
          console.log('service post', this.postsSubject.value);
          this.postsSubject.next(res.data);
        })
      );
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(`${constants.baseUrl}/blog/${id}`);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(constants.baseUrl + `/blog/${id}`);
  }

  postBlog(data: IPost): Observable<any> {
    return this.http.post(constants.baseUrl + '/blog', data);
  }

  updatePost(id: number | null, data: IPost): Observable<any> {
    return this.http.put(constants.baseUrl + `/blog/${id}`, data);
  }
}
