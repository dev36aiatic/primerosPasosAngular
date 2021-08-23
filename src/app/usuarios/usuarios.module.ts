import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PrimengModule } from '../primeng/primeng.module';
import { HistoryComponent } from './pages/history/history.component';
import { VideoComponent } from './pages/video/video.component';



@NgModule({
  declarations: [HomeComponent, MainComponent, ProfileComponent, HistoryComponent, VideoComponent],
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
