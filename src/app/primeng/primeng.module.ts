import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuModule} from 'primeng/menu';


@NgModule({
  exports:[
    CalendarModule,
    ProgressSpinnerModule,
    TableModule,
    SelectButtonModule,
    TabMenuModule,
    MenuModule,
 ]
})
export class PrimengModule { }
