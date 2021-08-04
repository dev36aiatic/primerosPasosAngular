import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    /* El path vacio es Dashboard, el que defini en appRouting */
    path:'',
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
