import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { WebServiceResponse } from '../../interfaces/web-service.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent implements OnInit {

  listado: WebServiceResponse[] = [];
  options: WebServiceResponse[] = [];
  regions!: any[];
  regionActiva: string = "Región Caribe";


  constructor(private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.loadData(this.regionActiva);

    this.regions = [
      { label: 'Región Caribe', value: 'Región Caribe' },
      { label: 'Región Centro Oriente', value: 'Región Centro Oriente' },
      { label: 'Región Centro Sur', value: 'Región Centro Sur' },
      { label: 'Región Eje Cafetero - Antioquia', value: 'Región Eje Cafetero - Antioquia' },
      { label: 'Región Llano', value: 'Región Llano' },
      { label: 'Región Pacífico', value: 'Región Pacífico' },
    ];

  }
  regionChanged(){
    this.loadData(this.regionActiva);
  }

    
  loadData(region: string){
    this.usuarioService.byRegion(region).subscribe(data => {
      this.listado = data;
      this.options = data;
    }, (error => console.log(error)))
  }

  filtrar(coincidencias: WebServiceResponse[]){
    this.options = coincidencias;
  }
}
