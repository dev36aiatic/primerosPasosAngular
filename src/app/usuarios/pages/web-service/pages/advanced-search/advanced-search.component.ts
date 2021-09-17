import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../../../services/usuario.service';
import { WebServiceResponse } from '../../interfaces/web-service.interface';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styles: [
  ]
})
export class AdvancedSearchComponent implements OnInit {

  listado: WebServiceResponse[] = [];
  options: WebServiceResponse[] = [];


  constructor(private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.usuarioService.getAllData().subscribe(data => {
      this.listado = data;
      this.options = data;
    }, (error => console.log(error)))

  }

  /**Metodo para buscar la informacion que el usuario escribe en el input */
  filtrar(coincidencias: WebServiceResponse[]) {
    this.options = coincidencias;
  }
}