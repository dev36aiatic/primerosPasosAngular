import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VideoComponent } from './pages/video/video.component';
import { BlogComponent } from './pages/blog/blog.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { NuevoPostComponent } from './pages/nuevo-post/nuevo-post.component';
import { TokenWpGuard } from '../guards/token-wp.guard';
import { IniciarSesionWpComponent } from './pages/iniciar-sesion-wp/iniciar-sesion-wp.component';


/** Rutas hijas del modulo usuarios */
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'video', component: VideoComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/iniciar-sesion-wp', component: IniciarSesionWpComponent },
      {
        path: 'blog/añadir-post', component: NuevoPostComponent,
        canActivate: [TokenWpGuard],
        canLoad: [TokenWpGuard],
      },
      { path: 'blog/:slug', component: SinglePostComponent },
      {
        path: 'web-service',
        loadChildren: () => import('./pages/web-service/web-service.module').then(m => m.WebServiceModule)
      },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
