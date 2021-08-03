import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LoginComponent, FormularioLoginComponent, SignupComponent, FormularioRegistroComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[LoginComponent]
})
export class IniciarSesionModule { }
