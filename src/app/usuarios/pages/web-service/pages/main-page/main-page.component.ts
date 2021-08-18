import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
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
    this.items = [
      {label: 'Region', icon: 'pi pi-fw pi-home', routerLink:'./web-service'},
      {label: 'Department ', icon: 'pi pi-fw pi-calendar',routerLink:'./por-departamento'},
      {label: 'Advanced Search', icon: 'pi pi-fw pi-pencil',routerLink:'./advanced-search'}
  ];
  }

}
