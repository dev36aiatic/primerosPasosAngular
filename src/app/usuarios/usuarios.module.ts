import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { MainComponent } from './pages/main/main.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { VideoComponent } from './pages/video/video.component';

@NgModule({
  declarations: [
    HomeComponent, 
    HistoryComponent,
    MainComponent,
    ProfileComponent,
    VideoComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    PrimengModule,
    SharedModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
