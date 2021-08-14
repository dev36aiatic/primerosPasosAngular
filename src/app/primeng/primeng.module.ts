import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';



@NgModule({
  exports:[
    CalendarModule,
    ProgressSpinnerModule
 ]
})
export class PrimengModule { }
