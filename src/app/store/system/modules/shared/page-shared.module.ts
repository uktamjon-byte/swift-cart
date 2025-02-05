import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageCardComponent } from './components/blog-page-card/blog-page-card.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BlogPageCardComponent
  ],
  imports: [CommonModule,RouterModule],  
  exports: [
    BlogPageCardComponent
  ] 
})
export class PageSharedModule { }
