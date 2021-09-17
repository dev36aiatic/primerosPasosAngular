import { Component, Input, OnInit } from '@angular/core';

import { UsuarioService } from '../../../../services/usuario.service';
import { WebServiceResponse } from '../../interfaces/web-service.interface';
import getDepartments from 'src/app/usuarios/functions/departments';
@Component({
  selector: 'app-por-departamento',
  templateUrl: './por-departamento.component.html',
  styles: [
  ]
})
export class PorDepartamentoComponent implements OnInit {
  listado: WebServiceResponse[] = [];
  options: WebServiceResponse[] = [];
  department: string = "Amazonas";
  departments: object[] = [];
  departmentFilter: string[] = []

  constructor(private usuarioService: UsuarioService) {
    this.departments = getDepartments();
  }
  ngOnInit(): void {
    this.loadData(this.department);

  }
  /**Metodo que se activa cuando el usuario hace click en un departamento */
  regionChanged() {
    this.loadData(this.department);
  }

  /** Metodo que busca el departamento
   * @param { string } department - Departamento
    */
  loadData(department: string) {
    this.usuarioService.byDepartment(department).subscribe(data => {
      this.listado = data;
      this.options = data;
    }, (error => console.log(error)))
  }

  /**Metodo para buscar la informacion que el usuario escribe en el input */
  filtrar(coincidencias: WebServiceResponse[]) {
    this.options = coincidencias;
  }

 
}
