import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PorMunicipioComponent } from './pages/por-municipio/por-municipio.component';
import { DaneMunicipioComponent } from './pages/dane-municipio/dane-municipio.component';
import { PorDepartamentoComponent } from './pages/por-departamento/por-departamento.component';
import { DaneDepartamentoComponent } from './pages/dane-departamento/dane-departamento.component';
import { PorRegionComponent } from './pages/por-region/por-region.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WebServiceRouting } from './web-routing.module';
import { TablaComponent } from './components/tabla/tabla.component';



@NgModule({
  declarations: [
    PorMunicipioComponent,
    DaneMunicipioComponent,
    PorDepartamentoComponent,
    DaneDepartamentoComponent,
    PorRegionComponent,
    MainPageComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    WebServiceRouting
  ],
  exports:[MainPageComponent]
})
export class WebServiceModule { }
