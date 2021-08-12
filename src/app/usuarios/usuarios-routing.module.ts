import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';


/** Rutas hijas del modulo usuarios */
const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      { path:'', component:HomeComponent },
      { path:'profile', component:ProfileComponent},
      { path:'**', redirectTo:'' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
