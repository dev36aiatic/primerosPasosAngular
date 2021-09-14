import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IniciarSesionRoutingModule } from './iniciar-sesion-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    FormularioLoginComponent,
    FormularioRegistroComponent,
    MainComponent,
    LoginComponent, 
    SignupComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IniciarSesionRoutingModule,
    PrimengModule
  ],
  exports:[LoginComponent,SignupComponent]
  
})
export class IniciarSesionModule { }
