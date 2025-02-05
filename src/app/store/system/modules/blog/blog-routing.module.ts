import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { BlogComponent } from './blog.component';


const routes: Routes = [
   {path:'', component: BlogComponent, children: [
        {path:'', component:AllPostsComponent},
        {path:':id', component:PostDetailComponent}
   ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }