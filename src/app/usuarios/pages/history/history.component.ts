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

  photoSelected: string | ArrayBuffer;

  /**Metodo que me devuelve la información del usuario */
  get userInfo() {
    return this.authService.user;
  }
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getImageFile(this.userInfo.user.profile.image.trim()).subscribe(
      image => {
        const reader = new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(image);
      }
    )
  }

}
