import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent implements OnInit {

  regionActiva!: string;

  regiones : string[] = [
    "Región Caribe",
    "Región Centro Oriente",
    "Región Centro Sur",
    "Región Eje Cafetero - Antioquia",
    "Región Llano",
    "Región Pacífico",
  ]
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioService.byRegion().subscribe(data =>{

      //Crear component de la tabla que me reciba el array de la region y lo muestre
      console.log(data)
    },(error => console.log(error)))
  }

}
