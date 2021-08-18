import { HttpParams, HttpClient } from '@angular/common/http';
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

  byRegion(region:string = 'Región Eje Cafetero - Antioquia'):Observable<WebServiceResponse>{
    const params = new HttpParams();
    params.set('region',region);
    console.log(`${this.baseURL}${params.toString()}`);
    return this.http.get<WebServiceResponse>(this.baseURL,{params})
  }

}
