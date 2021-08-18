import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PorRegionComponent } from './pages/por-region/por-region.component';
import { PorDepartamentoComponent } from './pages/por-departamento/por-departamento.component';
import { AdvancedSearchComponent } from './pages/advanced-search/advanced-search.component';


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
           path:'advanced-search',
           component:AdvancedSearchComponent
           },
           {
           path:'por-departamento',
           component:PorDepartamentoComponent
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