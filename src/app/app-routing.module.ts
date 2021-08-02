import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { LoginComponent } from './iniciar-sesion/pages/login/login.component';
import { HomeComponent } from './usuarios/home/home.component';

const routes: Routes = [
    {
        path:'', 
        component:LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path:'**',
        redirectTo :''
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class appRoutingModule {}