import { Component, Input, OnInit } from '@angular/core';

import { UsuarioService } from '../../../../services/usuario.service';
import { WebServiceResponse } from '../../interfaces/web-service.interface';
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
    this.departments = this.getDepartments();
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

  /**Metodo que devuelve los departamentos de colombia
   * @returns Departamentos de colombia
   */
  getDepartments() {
    return [
      { label: "Amazonas", value: "Amazonas" },
      { label: "Antioquía", value: "Antioquia" },
      { label: "Arauca", value: "Arauca" },
      { label: "Atlántico", value: "Atlántico" },
      { label: "Bolívar", value: "Bolívar" },
      { label: "Boyacá", value: "Boyacá" },
      { label: "Caldas", value: "Caldas" },
      { label: "Caquetá", value: "Caquetá" },
      { label: "Casanare", value: "Casanare" },
      { label: "Cauca", value: "Cauca" },
      { label: "Cesar", value: "Cesar" },
      { label: "Chocó", value: "Chocó" },
      { label: "Córdoba", value: "Córdoba" },
      { label: "Cundinamarca", value: "Cundinamarca" },
      { label: "Guainía", value: "Guainía" },
      { label: "Guaviare", value: "Guaviare" },
      { label: "Huila", value: "Huila" },
      { label: "La Guajira", value: "La Guajira" },
      { label: "Magdalena", value: "Magdalena" },
      { label: "Meta", value: "Meta" },
      { label: "Nariño", value: "Nariño" },
      { label: "Norte de Santander", value: "Norte de Santander" },
      { label: "Putumayo", value: "Putumayo" },
      { label: "Quindío", value: "Quindío" },
      { label: "Risaralda", value: "Risaralda" },
      { label: "Santander", value: "Santander" },
      { label: "Sucre", value: "Sucre" },
      { label: "Tolima", value: "Tolima" },
      { label: "Valle del Cauca", value: "Valle del Cauca" },
      { label: "Vaupés", value: "Vaupés" },
      { label: "Vichada", value: "Vichada" }
    ]
  }
}
