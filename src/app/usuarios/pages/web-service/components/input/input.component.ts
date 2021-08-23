import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { WebServiceResponse } from '../../interfaces/web-service.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: [
  ]
})
export class InputComponent implements OnInit {

  @Input() termino: string = "";
  @Input() listado: WebServiceResponse[] = []
  coincidencias: WebServiceResponse[] = [];
  @Output() onSendOptions: EventEmitter<WebServiceResponse[]> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  /**
   * Funcion que toma el valor que busca el usuario en el input y busca coincidencias
   * con los datos que posee la aplicacion de los municipios y departamentos de colombia
   */
  filtrar() {
    this.coincidencias = this.listado.filter(element => {
      return element.c_digo_dane_del_departamento.toLowerCase().indexOf(this.termino.toLowerCase()) > -1 ||
        element.c_digo_dane_del_municipio.toLowerCase().indexOf(this.termino.toLowerCase()) > -1 ||
        element.departamento.toLowerCase().indexOf(this.termino.toLowerCase()) > -1 ||
        element.municipio.toLowerCase().indexOf(this.termino.toLowerCase()) > -1 ||
        element.region.toLowerCase().indexOf(this.termino.toLowerCase()) > -1
    });
    this.onSendOptions.emit(this.coincidencias);
  };

}
