import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { WebServiceResponse } from '../pages/web-service/interfaces/web-service.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseURL:string = environment.baseMunicipios;
  constructor(private http: HttpClient) { }

  /**Getter de los headers */
  get getHeaders(){
    return new HttpHeaders().set('X-App-Token','h3hDtPFQzmsZpKk233KYxuGuM');
  }

  /**Peticion http que trae toda la data de los municipios y departamentos de colombia 
   * @returns Municipios y departamentos de colombia
  */
  getAllData():Observable<WebServiceResponse[]>{
    return this.http.get<WebServiceResponse[]>(this.baseURL,{headers:this.getHeaders});
  }

  /**Peticion http que trae la informacion de la region especificada
   * @param { string } region - Nombre de la region
   * @returns Informacion de la region
   */
  byRegion(region:string):Observable<WebServiceResponse[]>{
    const url = `${this.baseURL}?`
    const params = new HttpParams().set('region',region);
    return this.http.get<WebServiceResponse[]>(url,{headers:this.getHeaders,params});
  }
  /**
   * 
   * @param {string} department - Nombre departamento
   * @returns Informacion del departamento
   */
  byDepartment(department:string):Observable<WebServiceResponse[]>{
    const url = `${this.baseURL}?`
    const params = new HttpParams().set('departamento',department);
    return this.http.get<WebServiceResponse[]>(url,{headers:this.getHeaders,params});
  }

}
