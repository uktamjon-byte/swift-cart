import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { IPostBlog } from '../../types/interfaces/blog.interface';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
@Input() posts:IPostBlog[]=[]
  constructor(
    private blogService:BlogService, 
    private paginationService: PaginationService
  ) { }

  public blogPostCard:IPostBlog[]=[]

  ngOnInit(): void {
    this.blogPostCard = this.blogService.postBlogs;
       console.log('sssssssssssssssss', this.posts)
      setTimeout(() => {
        this.paginationService.showPaginationSubject.next(true);
      }, 0);
  }
  

}
