import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { IPostBlog } from '../../types/interfaces/blog.interface';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss']
})
export class RecentPostsComponent implements OnInit {

  constructor(private blogService:BlogService) { }
  blogPosts:IPostBlog[] = [];
  postTitle:string = '';

  ngOnInit() {
    this.blogPosts = this.blogService.postBlogs.slice(0, 6);
  }

}
