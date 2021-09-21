import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [
  ]
})
export class MainPageComponent implements OnInit {
  
  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    //Menu del webservice
    this.items = [
      { label: 'Región', icon: 'pi pi-fw pi-home', routerLink: './web-service' },
      { label: 'Departamento ', icon: 'pi pi-fw pi-map', routerLink: './por-departamento' },
      { label: 'Busqueda Avanzada', icon: 'pi pi-fw pi-search', routerLink: './advanced-search' }
    ];
  }
}
