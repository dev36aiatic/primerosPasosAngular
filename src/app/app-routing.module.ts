import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path:'auth', 
        loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then(m => m.IniciarSesionModule)
    },
    {
        path:'dashboard', 
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
    },
    {
        path:'**', 
        redirectTo:'auth'
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class appRoutingModule {}