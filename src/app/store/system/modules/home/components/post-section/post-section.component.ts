import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { BlogService } from '../../../blog/services/blog.service';
import { IPostBlog } from '../../../blog/types/interfaces/blog.interface';

@Component({
  selector: 'app-post-section',
  templateUrl: './post-section.component.html',
  styleUrls: ['./post-section.component.scss']
})
export class PostSectionComponent implements OnInit {

  posts:IPostBlog[]=[]
  constructor(private blogService:BlogService) { }
breakpoints: SwiperOptions['breakpoints'] = {
    425:{slidesPerView: 1, spaceBetween:10},
    576: { slidesPerView: 2, spaceBetween: 15 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
  };
  ngOnInit(): void {
    this.posts = this.blogService.postBlogs
  }

}
