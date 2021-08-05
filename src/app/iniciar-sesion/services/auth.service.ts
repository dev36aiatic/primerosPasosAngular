import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable, pipe } from 'rxjs';

import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: (User | SocialUser);

  private isLogged: boolean;

  get user() {
    return { ... this._user }
  }

  get isLoggedIn(){
    return this.isLogged;
  }
  

  constructor(private httpClient: HttpClient, private authService: SocialAuthService) { }


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

  signup(name: string, email: string, password: string) {

    const url = `${this.baseUrl}/new`;
    const body = { name, email, password }

    return this.httpClient.post<AuthResponse>(url, body)
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
        catchError(err => of(false, this.isLogged = false))
      );
  }

  validateAuthGoogle():Observable<boolean>{

    const url = `${this.baseUrl}/validateToken`;
    const headers = new HttpHeaders().set('token-auth', localStorage.getItem('logged') || '');

    return this.httpClient.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          this.isLogged = true;
          this._user = resp;
          return resp.ok;
        }),
        catchError(err => of(false, this.isLogged = false))
      );
  }

  logout() {
    localStorage.clear();
  }

  loginGoogle() {
    return this.authService.authState.pipe(
      tap( user =>{
        this._user = user;
        localStorage.setItem('logged',user.idToken);
        this.isLogged = true;
      }),
      catchError(err => of(this.isLogged = false))
    )
   
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
