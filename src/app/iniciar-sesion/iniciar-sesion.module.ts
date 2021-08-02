import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';



@NgModule({
  declarations: [LoginComponent, FormularioLoginComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[LoginComponent]
})
export class IniciarSesionModule { }
