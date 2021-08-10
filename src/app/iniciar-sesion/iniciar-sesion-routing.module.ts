import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

/** Rutas hijas del modulo iniciar sesion */

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      { 
        path:'',
        component:LoginComponent
      },
      {
        path:'signup',
        component:SignupComponent
      },
      {
        path:'**',
        redirectTo:''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IniciarSesionRoutingModule { }
