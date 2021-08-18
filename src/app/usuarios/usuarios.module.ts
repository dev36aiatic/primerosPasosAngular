import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule  } from '@angular/forms';


import { PrimengModule } from '../primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent, MainComponent, ProfileComponent],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    UsuariosRoutingModule,
    PrimengModule,
    HttpClientModule
    
  ]
})
export class UsuariosModule { }
