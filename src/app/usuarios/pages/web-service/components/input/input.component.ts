import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebServiceResponse } from '../../interfaces/web-service.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: [
  ]
})
export class InputComponent implements OnInit {

  termino: string = "";
  @Input() listado:WebServiceResponse[] = []
  coincidencias: WebServiceResponse[] = [];
  @Output() onSendOptions: EventEmitter<WebServiceResponse[]> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  filtrar(){

    this.coincidencias = this.listado.filter(element =>{
      return element.c_digo_dane_del_departamento.toLowerCase().includes(this.termino.toLowerCase()) ||
             element.c_digo_dane_del_municipio.toLowerCase().includes(this.termino.toLowerCase()) ||
             element.departamento.toLowerCase().includes(this.termino.toLowerCase()) ||
             element.municipio.toLowerCase().includes(this.termino.toLowerCase()) ||
             element.region.toLowerCase().includes(this.termino.toLowerCase())

    });
    
    this.onSendOptions.emit(this.coincidencias);

  };


}
