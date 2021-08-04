import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
