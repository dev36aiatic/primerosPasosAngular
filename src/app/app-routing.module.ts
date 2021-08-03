import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { LoginComponent } from './iniciar-sesion/pages/login/login.component';
import { HomeComponent } from './usuarios/pages/home/home.component';
import { SignupComponent } from './iniciar-sesion/pages/signup/signup.component';

const routes: Routes = [
    {
        path:'', 
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignupComponent
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