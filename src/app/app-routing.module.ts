import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';

import { ValidateTokenGuard } from './guards/validate-token.guard';

const routes: Routes = [
    {
        path:'auth', 
        loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then(m => m.IniciarSesionModule)
    },
    {
        path:'dashboard', 
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
        canActivate:[ ValidateTokenGuard],
        canLoad: [ ValidateTokenGuard,  ]
    },
    {
        path:'**', 
        redirectTo:'auth'
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes,{ useHash: true})],
    exports:[RouterModule]
})
export class appRoutingModule {}