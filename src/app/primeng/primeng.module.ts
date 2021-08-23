import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    DividerModule,
    MenuModule,
    ProgressSpinnerModule,
    SidebarModule,
    SelectButtonModule,
    TableModule,
    TabMenuModule
  ]
})
export class PrimengModule { }
