import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './pages/all-posts/blog.component';
import { LoginWpComponent } from './pages/login-wp/login-wp.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { TokenWpGuard } from '../../../guards/token-wp.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: BlogComponent
      },
      {
        path: 'iniciar-sesion-wp',
        component: LoginWpComponent
      },
      {
        path: 'añadir-post', component: NewPostComponent,
        canActivate: [TokenWpGuard]
      },
      {
        path: ':slug',
        component: SinglePostComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
