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

  get getHeaders(){
    return new HttpHeaders().set('X-App-Token','h3hDtPFQzmsZpKk233KYxuGuM');
  }

  byRegion(region:string):Observable<WebServiceResponse[]>{
    const url = `${this.baseURL}?`
    const params = new HttpParams().set('region',region);
    return this.http.get<WebServiceResponse[]>(url,{headers:this.getHeaders,params});
  }

}
