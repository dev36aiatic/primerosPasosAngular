import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Post } from '../interfaces/post.interface';
import { UserWordpress } from '../interfaces/user-wp.interface';
import { ValidateWPToken } from '../interfaces/wp-token.interface';
import { LoggedWpUser } from '../interfaces/logged-wp-user.interface';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  private urlWP: string = environment.wpURL;
  private urlWpToken: string = environment.wpToken;
  private wpUser: LoggedWpUser;

  constructor(private http: HttpClient) { }

  get wpHeaders() {
    return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('wp-token') || '');
  }

  get getUserWp(){
    return { ...this.wpUser }
  }


  /**
   * Numero de post a mostrar
   * @param id
   */
  getAll(id: number): Observable<Post[]> {
    const url = `${this.urlWP}/posts`
    return this.http.get<Post[]>(`${url}?_embed&per_page=${id}`);
  }

  /**
   * Slug del post  a mostrar
   * @param id
   */
  getSinglePost(id: string): Observable<Post> {
    const url = `${this.urlWP}/posts`
    return this.http.get<Post>(`${url}?_embed&slug=${id}`);
  }

  /**
   * 
   * @param username - nombre de usuario
   * @param password - contraseña
   * @returns - Informacion del usuario y token
   */
  wordpressLogin(username: string, password: string) {
    const body = { username, password }

    return this.http.post<UserWordpress>(this.urlWpToken, body)
      .pipe(
        tap(data => {
          if (data.token) {
            localStorage.setItem('wp-token', data.token);
          }
        }),
        catchError(error => of(error))
      );
  }

  /**
   * Funcion para validar el token de wordpress
   * @returns observable true si el token es valido, si es falso observable false
   */
  validateWpToken(): Observable<boolean> {
    const url = `${this.urlWpToken}/validate`;

    return this.http.post<ValidateWPToken>(url, null, { headers: this.wpHeaders })
      .pipe(
        map(resp => {
          if (resp.code === 'jwt_auth_valid_token') {
            return true;
          }
          return false;
        }),
        catchError(err => of(false))
      );
  }

  /**
   * Funcion que toma la informacion del usuario que inicio sesion
   * @returns Usuario de wordpress que inicio sesion
   */
  getWPUser(): Observable<LoggedWpUser> {
    const url = `${this.urlWP}/users/me`;
    
    return this.http.post<LoggedWpUser>(url, null, { headers: this.wpHeaders })
    .pipe(
      tap(wpUser => this.wpUser = wpUser),
      catchError(err => of(err.error))
      );
  }

  /**
   * Funcion para cerrar sesion
   */
  wpLogout() {
    if (localStorage.getItem('wp-token')) {
      localStorage.removeItem('wp-token');
    }
  }
}
