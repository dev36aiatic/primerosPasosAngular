import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { MainComponent } from './pages/main/main.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { VideoComponent } from './pages/video/video.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';

@NgModule({
  declarations: [
    HomeComponent, 
    HistoryComponent,
    MainComponent,
    ProfileComponent,
    VideoComponent,
    PhotoFormComponent,
    PhotoPreviewComponent,
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PrimengModule,
    SharedModule,
    FormsModule,
    UsuariosRoutingModule
  ],
  providers:[
  ]
})
export class UsuariosModule { }
