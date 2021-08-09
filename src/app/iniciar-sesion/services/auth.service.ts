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
  private isLogged: boolean = false;

  //Getter del usuario
  get user() {
    return { ... this._user }
  }

  //Getter del estado del usuario si inicia sesion con google y facebook
  get isLoggedIn() {
    return this.isLogged;
  }


  constructor(private httpClient: HttpClient, private authService: SocialAuthService) { }


  //Metodo para iniciar sesion
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

  //Metodo para registrarse
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

  //Metodo para validar token creado utilizando jwt
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


//Metodo que me permite validar el token de google o facebook
  validateAuthGoogleFb(decision: string): Observable<boolean> {

    if (decision == 'GOOGLE') {
      const url = `${this.baseUrl}/validateToken`;
      const headers = new HttpHeaders().set('token-auth', localStorage.getItem('social-token') || '');

      return this.httpClient.get<any>(url, { headers })
        .pipe(
          map(resp => {

            this._user = resp;
            return resp.ok;
          }),
          catchError(err => of(false, this.isLogged = false))
        );
    } else
      if (decision == 'FACEBOOK') {
        const url = `${this.baseUrl}/auth/facebook/token?access_token=${localStorage.getItem('social-token') || ''}`;

        return this.httpClient.get<any>(url)
          .pipe(
            map(resp => {

              this._user = resp;
              return resp.ok;
            }),
            catchError(err => of(false, this.isLogged = false))
          );
      }

  }

  //Metodo para borrar los tokens (cerrar sesion)
  logout() {
    localStorage.clear();
  }

  //Metodo para asber si el usuario esta logeado en la app
  loginGoogle() {
    return this.authService.authState.pipe(
      tap(user => {

        this._user = user;
        this.isLogged = (user != null);
        if ((user != null)) {

          if (user.provider == "GOOGLE") {
            localStorage.setItem('provider', 'GOOGLE');
            localStorage.setItem('social-token', user.idToken);
          }
          if (user.provider == "FACEBOOK") {
            localStorage.setItem('provider', 'FACEBOOK');
            localStorage.setItem('social-token', user.authToken);
          }
        }


      }), catchError(err => of(err))
    )

  }


  //Metodo para colocar el token que me devuelve jwt para validar el inicio de sesion
  setTokenAndUser(resp: AuthResponse) {
    localStorage.setItem('token', resp.token!);
    this._user = {
      name: resp.name!,
      uid: resp.uid!,
      email: resp.email
    }
  }

}
