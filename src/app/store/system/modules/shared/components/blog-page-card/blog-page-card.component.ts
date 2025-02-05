import { Component, Input, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { BlogService } from '../../../blog/services/blog.service';
import { IPostBlog } from '../../../blog/types/interfaces/blog.interface';

@Component({
  selector: 'app-blog-page-card',
  templateUrl: './blog-page-card.component.html',
  styleUrls: ['./blog-page-card.component.scss']
})
export class BlogPageCardComponent implements OnInit {
  @Input() posts:IPostBlog[]=[]
  blogPostCard:IPostBlog[]=[];
  
  constructor( private blogService:BlogService, 
    private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.blogPostCard = this.posts;
       
      setTimeout(() => {
        this.paginationService.showPaginationSubject.next(true);
      }, 0);
  }
  }


