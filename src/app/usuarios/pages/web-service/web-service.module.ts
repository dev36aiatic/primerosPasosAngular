import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PorDepartamentoComponent } from './pages/por-departamento/por-departamento.component';
import { PorRegionComponent } from './pages/por-region/por-region.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WebServiceRouting } from './web-routing.module';
import { TablaComponent } from './components/tabla/tabla.component';
import { PrimengModule } from '../../../primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { AdvancedSearchComponent } from './pages/advanced-search/advanced-search.component';



@NgModule({
  declarations: [
    PorDepartamentoComponent,
    PorRegionComponent,
    MainPageComponent,
    TablaComponent,
    InputComponent,
    AdvancedSearchComponent
  ],
  imports: [
    CommonModule,
    WebServiceRouting,
    PrimengModule,
    FormsModule
  ],
  exports:[MainPageComponent]
})
export class WebServiceModule { }
