import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../iniciar-sesion/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**Getter de la informacion de usuario */
  get infoUser() {
    return this.authService.user.user;
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

  }

}
