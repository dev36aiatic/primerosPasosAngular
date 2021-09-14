import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PrimengModule } from '../../../primeng/primeng.module';
import { BlogComponent } from './pages/all-posts/blog.component';
import { LoginWpComponent } from './pages/login-wp/login-wp.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogRoutingModule } from './blog-routing.module';
import { MenuWpComponent } from './components/menu-wp/menu-wp.component';



@NgModule({
  declarations: [
    MainPageComponent,
    BlogComponent,
    LoginWpComponent,
    NewPostComponent,
    SinglePostComponent,
    MenuWpComponent
  ],
  exports:[MainPageComponent],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
