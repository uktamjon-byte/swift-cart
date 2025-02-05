import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { IPostBlog } from '../../types/interfaces/blog.interface';
import { EventEmitter } from 'node:stream';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId: number | null = null; // ID from route params
  postDetails: IPostBlog | null = null; // Single post object
  isDetailsComponentActive:string = 'true';


  constructor(
    private blogService: BlogService, 
    private route: ActivatedRoute,
     private paginationService: PaginationService,
     private cdRef: ChangeDetectorRef
    ) {}

  ngOnInit() {
    // Get the post ID from the route parameters
    this.route.params.subscribe((params) => {
      this.postId = params['id']
      this.postDetails = this.blogService.postBlogs.find(item => item.id == this.postId) || null;
    });

    console.log('postdetails', this.postDetails)
 
    setTimeout(() => {
      this.paginationService.showPaginationSubject.next(false);
    }, 0);
    
  }
}
