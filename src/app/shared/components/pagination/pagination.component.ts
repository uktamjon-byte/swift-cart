import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/store/system/core/services/system.service';
import { BlogService } from 'src/app/store/system/modules/blog/services/blog.service';
import { IPostBlog } from 'src/app/store/system/modules/blog/types/interfaces/blog.interface';
import { IPageLists } from '../../types/interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AllPostsComponent } from 'src/app/store/system/modules/blog/pages/all-posts/all-posts.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  blogPostLength:number = 0
  pageLimit:number = 1;
  pageLists:IPageLists[]=[];
  currentPage:number = 1;
  isDisabledPrev:boolean = true;
  isDisabledNext:boolean = false;
  showPagination:boolean = true;
  constructor(private blogService:BlogService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
   this.blogPostLength = this.blogService.postBlogs.length;
   this.fillPage();
   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
    const currentComponent = this.route.snapshot.firstChild?.component;
    this.showPagination = currentComponent === AllPostsComponent; // Import AllPagesComponent at the top
  });

   console.log('lenth', this.blogPostLength);
   console.log('dede', this.calculatePage());
   console.log('showpag', this.showPagination)
  }

  

  calculatePage(){
    let totalPage:number = Math.trunc(this.blogPostLength / this.pageLimit);
    console.log('totalliy', totalPage)
    if(totalPage < 1){
       totalPage+=1;
    }else if(totalPage % 5 != 0){
       totalPage += 1
    }
    return totalPage;
  }

  fillPage(){
    for(let i = 1; i<=this.calculatePage(); i++){
      this.pageLists.push({
        page: i,
        active: i == this.currentPage,
      })
    }
  }

  goToPage(i:number){
    this.pageLists.forEach(item=> item.active = false);
    this.pageLists[i].active = true;

    this.isDisabledPrev = (i === 0) ? true : false;
    this.isDisabledNext = (i===this.pageLists.length-1) ? true : false;
  }

  emitActivePage(){
    let activePage:any = this.pageLists.find(item => item.active = true)?.page;
    this.currentPage = activePage;
  }
  
  next(){
    const activeIndex = this.pageLists.findIndex(item=> item.active === true);
    if(activeIndex+1 <= this.pageLists.length-1){
      console.log('next dld', activeIndex, this.blogPostLength)
      this.goToPage(activeIndex+1);
      //  this.isDisabledNext = true;
      //  this.isDisabledPrev = false;
     
   
    }
      
  }

  prev(){
    const activeIndex = this.pageLists.findIndex(item=> item.active === true);
    if(activeIndex-1 >= 0) {
      this.goToPage(activeIndex-1);
    //  this.isDisabledPrev = true;
     // this.isDisabledNext = false;
    }
      
  }
}
