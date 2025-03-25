import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { BlogService } from './services/blog.service';
import { IPostBlog } from './types/interfaces/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
public blogPosts:IPostBlog[]=[];
  constructor(
    private paginationService: PaginationService, 
    private blogService:BlogService
  ) { }
  showPagination = false;
  ngOnInit(): void {
   this.blogPosts = this.blogService.postBlogs;
   this.paginationService.showPaginationSubject
   .subscribe(isVisible => {
     this.showPagination = isVisible;
   });

   console.log('blogsss', this.blogPosts)
  }

  ngAfterViewInit() {
  
  }
}
