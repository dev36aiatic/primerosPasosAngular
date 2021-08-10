import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';


/** Rutas hijas del modulo usuarios */
const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      { path:'', component:HomeComponent },
      { path:'**', redirectTo:'' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
