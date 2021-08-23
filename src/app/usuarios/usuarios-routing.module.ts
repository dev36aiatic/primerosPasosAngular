import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VideoComponent } from './pages/video/video.component';


/** Rutas hijas del modulo usuarios */
const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      { path:'', component:HomeComponent },
      { path:'profile', component:ProfileComponent},
      { path:'history', component:HistoryComponent},
      { path:'video', component:VideoComponent},
      { path:'web-service',
        loadChildren: ()=> import ('./pages/web-service/web-service.module').then(m => m.WebServiceModule)  
      },
      { path:'**', redirectTo:'' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
