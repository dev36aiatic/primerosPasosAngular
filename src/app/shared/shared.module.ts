import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthorComponent } from './author/author.component';



@NgModule({
  declarations: [SidebarComponent, AuthorComponent],
  imports: [
    CommonModule
  ],
  exports:[SidebarComponent,AuthorComponent]
})
export class SharedModule { }
