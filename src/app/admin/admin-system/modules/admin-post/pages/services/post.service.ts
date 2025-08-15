import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostBlogService {
  private postSource = new BehaviorSubject<any>(null);
  post$ = this.postSource.asObservable();

  setPost(post: any) {
    this.postSource.next(post);
  }
}
