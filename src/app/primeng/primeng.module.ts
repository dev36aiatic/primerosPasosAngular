import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuModule} from 'primeng/menu';
import {SidebarModule} from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import {DividerModule} from 'primeng/divider';

@NgModule({
  exports:[
    CalendarModule,
    ProgressSpinnerModule,
    TableModule,
    SelectButtonModule,
    TabMenuModule,
    MenuModule,
    SidebarModule,
    ButtonModule,
    DividerModule
 ]
})
export class PrimengModule { }
