import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {SelectButtonModule} from 'primeng/selectbutton';



@NgModule({
  exports:[
    CalendarModule,
    ProgressSpinnerModule,
    TableModule,
    SelectButtonModule
 ]
})
export class PrimengModule { }
