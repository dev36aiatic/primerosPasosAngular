import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable, pipe } from 'rxjs';

import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ProfileData } from 'src/app/usuarios/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: (AuthResponse | SocialUser | any);
  private isLogged: boolean = false;

  /**Getter del usuario*/
  get user() {
    return { ... this._user }
  }

  /**Getter del estado del usuario si inicia sesion con google y facebook*/
  get isLoggedIn() {
    return this.isLogged;
  }

  constructor(private httpClient: HttpClient, private authService: SocialAuthService) { }

  /**Metodo para iniciar sesion*/
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
  /**Metodo para registrarse*/
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
  /**Metodo para validar token creado utilizando jwt*/
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
  /**Metodo para llenar el formulario de perfil de usuario */
  userProfile(user: ProfileData, id: string, provider: string = '') {
    const url = `${this.baseUrl}/update/${id}/${provider}`;
    const body = {
      name: user.name,
      cc: user.cc,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      city: user.city,
      department: user.department,
      country: user.country,
      ZIP: user.ZIP,
      profession: user.profession,
      skills: user.skills,
      description: user.description
    }

    return this.httpClient.put<AuthResponse>(url, body).pipe(
      tap(user => this._user = user),
      catchError(err => of(err.error))
    )
  }

  /**
   * Metodo que sube la imagen del usuario
   * @param files - Datos de la imagen
   */
  uploadImage(id: string, files, provider: string = '') {
    const url = `${this.baseUrl}/upload-image/${id}/${provider}`;
    const formData = new FormData();
    formData.append('image', files)

    return this.httpClient.post<any>(url, formData).pipe(
      tap(user => this._user = user),
      catchError(err => of(err.error))
    )
  }

  /**
   * Metodo que busca en el backend la imagen del usuario para mostrarla
   * @param fileName - Nombre de la imagen que tiene el usuario
   * @returns 
   */
  getImageFile(fileName: string) {
    const url = `${this.baseUrl}/get-image/${fileName}`;

    return this.httpClient.get<any>(url, { responseType: 'Blob' as 'json' }).pipe(
      catchError(err => of(err.error))
    );
  }

  /**Metodo que me permite validar el token de google o facebook*/
  validateAuthGoogleFb(decision: string): Observable<boolean> {
    let objectSocialAuth = {
      "GOOGLE": () => {
        const url = `${this.baseUrl}/validateToken`;
        const headers = new HttpHeaders().set('token-auth', localStorage.getItem('token') || '');
        return this.httpClient.get<AuthResponse>(url, { headers })
          .pipe(
            map(resp => {
              this._user = resp;
              return resp.ok;
            }),
            catchError(err => of(false, this.isLogged = false))
          );
      },
      "FACEBOOK": () => {
        const url = `${this.baseUrl}/auth/facebook/token?access_token=${localStorage.getItem('token') || ''}`;
        return this.httpClient.get<AuthResponse>(url)
          .pipe(
            map(resp => {
              this._user = resp;
              return resp.ok;
            }),
            catchError(err => of(false, this.isLogged = false))
          );
      },
      "DEFAULT": () => {
        return of(false, this.isLogged = false);
      }
    }

    return objectSocialAuth[decision]() || objectSocialAuth["DEFAULT"]();
  }

  /**Metodo para borrar los tokens (cerrar sesion)*/
  logout() {
    localStorage.clear();
  }

  /**Metodo para asber si el usuario esta logeado en la app*/
  loginGoogle() {
    return this.authService.authState.pipe(
      tap(user => {
        this._user = user;
        this.isLogged = (user != null);

        if ((user != null)) {
          if (user.provider == "GOOGLE") {
            localStorage.setItem('provider', 'GOOGLE');
            localStorage.setItem('token', user.idToken);
          }

          if (user.provider == "FACEBOOK") {
            localStorage.setItem('provider', 'FACEBOOK');
            localStorage.setItem('token', user.authToken);
          }
        }
      }), catchError(err => of(false, this.isLogged = false))
    )
  }

  /**Metodo para colocar el token que me devuelve jwt para validar el inicio de sesion*/
  setTokenAndUser(resp: AuthResponse) {
    localStorage.setItem('provider', 'ownLogin');
    localStorage.setItem('token', resp.token!);
    this._user = resp;
  }
}
