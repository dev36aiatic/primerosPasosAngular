import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PorRegionComponent } from './pages/por-region/por-region.component';
import { DaneDepartamentoComponent } from './pages/dane-departamento/dane-departamento.component';
import { PorDepartamentoComponent } from './pages/por-departamento/por-departamento.component';
import { PorMunicipioComponent } from './pages/por-municipio/por-municipio.component';
import { DaneMunicipioComponent } from './pages/dane-municipio/dane-municipio.component';


const routes:Routes =[
    {
       path:'',
       component:MainPageComponent,
       children:[
           {
           path:'',
           component:PorRegionComponent
           },
           {
           path:'codigo-dane-departamento',
           component:DaneDepartamentoComponent
           },
           {
           path:'por-departamento',
           component:PorDepartamentoComponent
           },
           {
           path:'codigo-dane-municipio',
           component:DaneMunicipioComponent
           },
           {
           path:'por-municipio',
           component:PorMunicipioComponent
           },
           {
           path:'**',
           redirectTo:''
           },
        ] 
    }
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
})


export class WebServiceRouting {}