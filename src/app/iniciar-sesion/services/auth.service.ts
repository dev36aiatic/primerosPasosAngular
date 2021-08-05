import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ... this._user }
  }

  constructor(private httpClient: HttpClient) { }


  login(email: string, password: string) {

    const url = `${this.baseUrl}/login`;
    const body = { email, password }

    return this.httpClient.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            this.setTokenAndUser(resp);
          }
        }),
        catchError(err => of(err.error.msg))
      );
  }

  signup(name:string, email:string, password:string){

    const url = `${this.baseUrl}/new`;
    const body = { name, email, password }

    return this.httpClient.post<AuthResponse>(url,body)
    .pipe(
      tap(resp => {
        this.setTokenAndUser(resp);
      }),
      catchError(err => of(err.error.msg))
    )

  }

  validateToken(): Observable<boolean> {

    const url = `${this.baseUrl}/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.httpClient.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {

          this.setTokenAndUser(resp);
          return resp.ok;

        }),
        catchError(err => of(false))
      );
  }

  logout(){
    localStorage.removeItem('token');
  }

  setTokenAndUser(resp: AuthResponse) {
    localStorage.setItem('token', resp.token!);
    this._user = {
      name: resp.name!,
      uid: resp.uid!,
      email: resp.email
    }
  }

}
