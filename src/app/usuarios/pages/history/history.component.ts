import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../iniciar-sesion/services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: [
    `
    .table td, .table th {
    vertical-align: middle !important;
    }
    `
  ]
})
export class HistoryComponent implements OnInit {

  /**Metodo que me devuelve la información del usuario */
  get userInfo(){
    return this.authService.user;
  }
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

}
