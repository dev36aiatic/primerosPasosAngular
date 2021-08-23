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
import { LogoUnabComponent } from './components/logo-unab/logo-unab.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    LoginComponent, 
    SignupComponent,
    FormularioLoginComponent,
    FormularioRegistroComponent,
    MainComponent,
    LogoUnabComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IniciarSesionRoutingModule,
    FormsModule,
    PrimengModule
  ],
  exports:[LoginComponent,SignupComponent]
  
})
export class IniciarSesionModule { }
