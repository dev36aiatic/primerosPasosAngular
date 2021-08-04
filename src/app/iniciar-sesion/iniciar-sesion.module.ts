import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IniciarSesionRoutingModule } from './iniciar-sesion-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    LoginComponent, 
    SignupComponent,
    FormularioLoginComponent,
    FormularioRegistroComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IniciarSesionRoutingModule,
    FormsModule
  ],
  exports:[LoginComponent,SignupComponent]
  
})
export class IniciarSesionModule { }
