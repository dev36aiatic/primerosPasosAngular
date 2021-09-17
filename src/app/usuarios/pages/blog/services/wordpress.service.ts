import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { LoggedWpUser } from '../interfaces/logged-wp-user.interface';
import { NewPost } from '../interfaces/new-post-wp.interface';
import { Post } from '../interfaces/post.interface';
import { UserWordpress } from '../interfaces/user-wp.interface';
import { WpCategory } from '../interfaces/wp-category.interface';
import { ValidateWPToken } from '../interfaces/wp-token.interface';
import { NewCategory } from '../interfaces/new-category.interface';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  private urlWP: string = environment.wpURL;
  private urlWpToken: string = environment.wpToken;

  constructor(private http: HttpClient) { }

  get wpHeaders() {
    return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('wp-token') || '');
  }

  /**
   * Funcion buscar posts
   * @param id - numero de posts a mostrar
   */
  getAll(id: number): Observable<Post[]> {
    const url = `${this.urlWP}/posts`
    return this.http.get<Post[]>(`${url}?_embed&per_page=${id}`);
  }

  /**
   * Funcion para buscar un post por su slug
   * @param id - slug del post
   */
  getSinglePost(id: string): Observable<Post> {
    const url = `${this.urlWP}/posts`
    return this.http.get<Post>(`${url}?_embed&slug=${id}`);
  }

  /**
   * Funcion para iniciar sesion en wordpress
   * @param username - nombre de usuario
   * @param password - contraseña
   * @returns - Informacion del basica del usuario y token
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
   * @returns - Observable true si el token es valido, de lo contrario observable false
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
        catchError(err => of(err.error))
      );
  }

  /**
   * Funcion para obtener las categorias que estan en wordpress
   * @returns Categorias almacenadas en wordpress
   */
  getCategories(): Observable<WpCategory[]> {
    const params = new HttpParams().set('per_page', 30);
    const url = `${this.urlWP}/categories?`;

    return this.http.get<WpCategory[]>(url, { params })
      .pipe(
        map(categories => {
          let filterData: WpCategory[] = [];

          categories.forEach(({ name, id }) => {
            filterData.push({ name, id });
          });

          return filterData;
        }),
        catchError(err => of(err.error))
      );
  }

  /**
   * Funcion para añadir media a wordpress
   * @param slug - Slug de la imagen
   * @param title - Titulo de la imagen
   * @param author - Id de la persona que subio la imagen
   * @param file - Imagen
   * @returns - Informacion de la imagen
   */
  uploadMedia(slug: string, title: string, author: any, file: any) {
    const url = `${this.urlWP}/media`;
    const formData = new FormData();

    formData.append('slug', slug);
    formData.append('status', 'publish');
    formData.append('title', title);
    formData.append('author', author);
    formData.append('media_type', 'image');
    formData.append('file', file);
    formData.append('comment_status', 'closed');

    return this.http.post(url, formData, { headers: this.wpHeaders })
      .pipe(
        catchError(err => of(err))
      )
  }

/**
 * Metodo que devuelve media guardada en wordpress
 * @param id - identificador de la media
 * @returns - Información de la media
 */
  getMedia(id: number) {
    const url = `${this.urlWP}/media/${id}`;

    return this.http.get(url).pipe(catchError(err => of(err)));
  }

  /**
   * Funcion para crear un nuevo post en wordpress
   * @param body - Datos basicos para crear un post
   * @returns - Informacion del post creado
   */
  newPost(body: NewPost): Observable<NewPost> {
    const url = `${this.urlWP}/posts`;

    return this.http.post<NewPost>(url, body, { headers: this.wpHeaders }).pipe(
      catchError(err => of(err))
    )
  }

  /**
   * Función para crear una nueva categoria
   * @param body - Objeto con la información de la nueva categoria
   * @returns - Información de la categoria creada
   */
  newCategory(body: object): Observable<NewCategory> {
    const url = `${this.urlWP}/categories`;

    return this.http.post<NewCategory>(url, body, { headers: this.wpHeaders })
      .pipe(
        catchError(err => {
          if (err.error.code == "term_exists") {
            return of({ error: err.error, msg: 'El slug proporcionado ya existe.' });
          }
          return of(err.error.message)
        })
      )
  }

  /**
   * Función para actualizar un post
   * @param body - Data del post para actualizar
   * @param id  - Indentifiador único del post
   * @returns - Post actualizado
   */
  updateSinglePost(body: NewPost, id: number): Observable<NewPost> {
    const url = `${this.urlWP}/posts/${id}`

    return this.http.post<NewPost>(url, body, { headers: this.wpHeaders })
      .pipe(catchError(err => of(err)));
  }

  /**
   * Funcion parar borrar un post
   * @param id - Identificador único del post
   * @returns - Post borrado
   */
  deleteSinglePost(id: number): Observable<Post> {
    const url = `${this.urlWP}/posts/${id}`

    return this.http.delete<Post>(url, { headers: this.wpHeaders })
      .pipe(
        catchError(err => of(err))
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
