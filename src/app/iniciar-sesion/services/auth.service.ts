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

  private provider: string;
  private socialToken: string;

  get user() {
    return { ... this._user }
  }

  get isLoggedIn() {
    return this.isLogged;
  }

  get getSocialToken(){
    return this.socialToken;
  }
  
  get getProvider(){
    return this.provider;
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
        catchError(err => of(false))
      );
  }

  //TODO: crear metodo que me guarde el usuario en la base de datos


  validateAuthGoogle(): Observable<boolean> {

    const url = `${this.baseUrl}/validateToken`;
    const headers = new HttpHeaders().set('token-auth', this.getSocialToken || '');

    return this.httpClient.get<any>(url, { headers })
      .pipe(
        map(resp => {

          this._user = resp;
          return resp.ok;
        }),
        catchError(err => of(false, this.isLogged = false))
      );
  }
  validateAuthFacebook(): Observable<boolean> {

    //TODO: HACER QUE VALIDAD FEISBUC FUNCIONE
    const url = `${this.baseUrl}/auth/facebook/token?access_token=${ this.getSocialToken || ''}`;

    return this.httpClient.get<any>(url)
      .pipe(
        map(resp => {

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
      tap(user => {
        this._user = user;
        console.log(user);
        
        this.isLogged = (user != null);

        if (this.user.provider == "GOOGLE") {
            this.provider = "GOOGLE";
            this.socialToken = user.idToken;
        }
        if (this.user.provider == "FACEBOOK") {
          this.provider = "FACEBOOK";
          this.socialToken = user.authToken;
        }
      }),catchError(err => of(err))
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
