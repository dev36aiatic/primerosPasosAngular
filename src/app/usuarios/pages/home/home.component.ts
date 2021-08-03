import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  autor = {
    correo : 'dev36@aiatic.com',
    nombre : 'Mauricio Barva',
    ocupacion: ' Estudiante de Ingenieria de Sistemas de la UNAB'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
