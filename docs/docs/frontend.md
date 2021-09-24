# Frontend

## Introducción

El presente documento tiene como objeto principal establecer la documentación de las páginas, menús, código e información general utilizada por el proyecto en la parte de Angular.

## Versión de Angular

* Angular CLI: 12.2.3
* Package Manager: npm 7.21.1
* OS: win32 x64

### Versión de los paquetes
                        
* @angular-devkit/architect       0.1100.7
* @angular-devkit/build-angular   0.1100.7
* @angular-devkit/core            11.0.7
* @angular-devkit/schematics      12.2.3
* @angular/cdk                    12.2.3
* @angular/cli                    12.2.3
* @schematics/angular             12.2.3
* rxjs                            6.6.7
* typescript                      4.3.5

**Para más información acerca de las dependecias utilizadas en el proyecto, entre otras cosas, puedes consultar el repositorio haciendo [click aquí](https://github.com/dev36aiatic/primerosPasosAngular)**

## Páginas públicas

Estas son las páginas a las que el usuario puede acceder sin necesidad de iniciar sesión.

### Registrarse

Esta es la página en la cual el usuario puede [crear una nueva cuenta](https://dev36-auth.herokuapp.com/#/auth/signup)

<center>

**Versión Web**

![Página de registro](./img/registro_web.png)

**Versión Móvil**

![Página de registro](./img/registro_movil.png)


</center>

En ambas imágenes se observan 3 campos que piden la siguiente información para realizar un registro:

1. Nombre completo del usuario
2. Correo electrónico del usuario
3. Contraseña del usuario

También se encuentra un boton de menú en la barra lateral izquierda, para más información sobre este menú [click aqui](#menu-publico)

#### Código utilizado para crear un usuario

**Definición del servicio en el frontend para crear un nuevo usuario en el backend**

```Typescript
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private _user!: ( AuthResponse | SocialUser );
    private baseUrl: string = 'https://dev36-auth.herokuapp.com';

     /**Getter del usuario*/
    get user() {
        return { ... this._user }
    }

    constructor(private httpClient: HttpClient) { }
    
    /**
     * Metodo para crear un usuario
     * @param name - Nombre del usuario
     * @param email - Correo del usuario
     * @param password - Contraseña del usuario
     * @returns - Si todo está bien usuario creado y token de acceso sino error
     */
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
    /**Metodo para colocar el token que devuelve jwt en el LocalStorage para validar el inicio de sesion*/
    setTokenAndUser(resp: AuthResponse) {
        localStorage.setItem('provider', 'ownLogin');
        localStorage.setItem('token', resp.token!);
        this._user = resp;
    }
}
```

**Implementación del servicio en el frontend para crear un nuevo usuario en el backend**

```Typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//Modulo de alertas
import Swal from 'sweetalert2';
//Importación del servicio creado
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html'
})
export class FormularioRegistroComponent {
    //Se define el formulario para capturar los datos
    mySignup: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    constructor(
        private fb: FormBuilder, 
        private router: Router,
        private authService: AuthService
        ) { }
    
    /**Metodo que se activa cuando el usuario crea un registro*/
    signup() {
        //Se recogen los valores del formulario
        const { name, email, password } = this.mySignup.value;

        // Se llama al servicio
        this.authService.signup(name, email, password)
        .subscribe(resp => {
            // Si la respuesta es exitosa redirige al Inicio de la aplicación
            if (resp.ok) {
                this.router.navigateByUrl('/dashboard');
            } else {
                // De lo contrario muestra un error
                Swal.fire(resp, 'Error', 'error');
            }
        })
    }
}
```

### Iniciar sesión

Esta es la página que carga por defecto cuando el usuario abre la [página de la aplicación](https://dev36-auth.herokuapp.com)

<center>

**Versión Web**

![Página inicio de sesión](./img/iniciar-sesion-web.jpg)

**Versión Móvil**

![Página inicio de sesión](./img/iniciar-sesion-movil.JPG)

</center>

Se observa un formulario el cual solicita el **correo** y la **contraseña** con el fin de acceder a la [página de inicio de la Dashboard](#inicio) con un usuario creado por medio de la aplicación.
También está la posibilidad de iniciar sesión con [Facebook](#inicio-de-sesion-con-facebook) y [Google](#inicio-de-sesion-con-google)

#### Inicio de sesión por medio de la aplicación

**Definición del servicio  en el frontend para iniciar sesión por medio de la aplicación**

```Typescript
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private _user!: ( AuthResponse | SocialUser );
    private baseUrl: string = 'https://dev36-auth.herokuapp.com';  

     /**Getter del usuario*/
    get user() {
        return { ... this._user }
    }

    constructor(private httpClient: HttpClient) { }
    /**
     * Metodo para iniciar sesión
    * @param email - Correo del usuario
    * @param password - Contraseña del usuario
    * @returns - Si todo está bien devuelve usuario y token de acceso sino error
    */
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
    /**Metodo para colocar el token que devuelve jwt en el LocalStorage para validar el inicio de sesion*/
    setTokenAndUser(resp: AuthResponse) {
        localStorage.setItem('provider', 'ownLogin');
        localStorage.setItem('token', resp.token!);
        this._user = resp;
    }
}
```
**Implementación del servicio  en el frontend para iniciar sesión por medio de la aplicación**

```Typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//Modulo de alertas
import Swal from 'sweetalert2'
//Importación del servicio
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styles: []
})
export class FormularioLoginComponent {
    //Se define el formulario para capturar los datos
    myLogin: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    })

    constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

    /**Funcion ejecutada cuando el usuario trata de iniciar sesion*/
    login() {
        // Se caputan los datos del formulario
        const { email, password } = this.myLogin.value;
        //Se llama el servicio
        this.authService.login(email, password).subscribe(resp => {
            // Si los datos son correctos redirige a la pagina de inicio de la aplicación
            if (resp.ok === true) {
            this.router.navigateByUrl('/dashboard');
            } else {
            // Si son incorrectos mada un aviso de error
            Swal.fire('Error', resp, 'error');
            }
        });
    }
}

```

#### Inicio de sesión con redes sociales

Para iniciar sesión por medio de las redes sociales Facebook y Google primero se debe hacer la siguiente configuración en el archivo `app.module`

```Typescript
import { NgModule } from '@angular/core';
//Modulo de inicio de sesion con Facebook o Google
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

@NgModule({[
    imports[
        ...,
        SocialLoginModule
    ],
    providers: [
        ...,
        {
        provide: 'SocialAuthServiceConfig',
        useValue: {
        autoLogin: false,
        providers: [
            {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
                'Identificador de la app de google'
            )
            },
            {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('Identificador de la app de Facebook')
            }
        ],
        onError: (err) => {
            console.error(err);
        }
        } as SocialAuthServiceConfig,
    }]
]})
export class AppModule { }
```
Una vez realizada la configuración en el paso anterior, se puede hacer uso de los métodos que trae
el modulo [angularx-social-login](https://www.npmjs.com/package/angularx-social-login)

#### Inicio de sesión con Facebook o Google

**Definición del servicio para iniciar sesión en Facebook o Google**

``` Typescript
import { Injectable } from '@angular/core';
import { AuthResponse, } from '../interfaces/auth.interface';
import { catchError, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: (AuthResponse | SocialUser );
  private isLogged: boolean = false;

   /**Getter del usuario*/
  get user() {
    return { ... this._user }
  }

  /**Getter del estado del usuario si inicia sesion con google y facebook*/
  get isLoggedIn() {
    return this.isLogged;
  }

  constructor(private authService: SocialAuthService) { }

  /**Metodo para saber si el usuario esta logeado en la app por medio de Facebook o Google*/
  loginGoogle() {
    return this.authService.authState.pipe(
      tap(user => {
        // Información del usuario de Facebook o Google
        this._user = user;
        // Si el usuario que recibe del servicio de angularx-social-login es distinto de null 
        // entonces la sesión está iniciada
        this.isLogged = (user != null);
        // Se revisa si el proveedor es Facebook o Google y coloca el token de inicio en el LocalStorage
        // Para futuras validaciones
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

}

```

**Utilizacion del servicio para iniciar sesión en Facebook o Google**

```Typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Modulos de autenticacion con facebook y google
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styles: []
})
export class FormularioLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private googleFacebookAuth: SocialAuthService
    ) { }

  ngOnInit(): void {
    /**Funcion que se subscribe ( llama el servicio creado anteriormente ) y obtiene al usuario 
     * cuando este inicia sesion con facebook o google */
    this.authService.loginGoogle().subscribe(user => {
        //Si el usuario es null significa que no ha iniciado sesión
      if (user == null) {
        localStorage.clear();
        this.router.navigateByUrl('/auth');
      }
        // Si ya inicio sesión redirige a la pagina de inicio
      if ((user != null)) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
  /**Funcion que abre la pantalla de iniciar sesion con google */
  signInWithGoogle(): void {
    this.googleFacebookAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  /**Funcion que abre la pantalla de sesion con facebook*/
  signInWithFB(): void {
    this.googleFacebookAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}

```


### Interfaces Involucradas

```Typescript
/**  Interfaz de la respuesta que devuelve la base de datos a iniciar/validar sesión del usuario*/

export interface AuthResponse {
    ok: boolean;
    token: string;
    user: User;
}

```

```Typescript
/** Interfaz de usuario */

export interface User {
    id: String,
    name: String;
    email: String;
    profile: Profile;
}

```

```Typescript
/**Interfaz del perfil del usuario */

export interface Profile {
    ZIP: Number;
    cc: Number;
    city: String;
    country: String;
    description: String;
    address: String;
    department: String;
    dateOfBirth: String;
}

```

```Typescript
/**Interfaz para los usuarios de Google o Facebook*/

export declare class SocialUser {
    provider: string;
    id: string;
    email: string;
    name: string;
    photoUrl: string;
    firstName: string;
    lastName: string;
    authToken: string;
    idToken: string;
    authorizationCode: string;
    response: any;
}

```

## Páginas privadas

Estas son las páginas con las que el usuario puede interacturar siempre y cuando haya iniciado sesión, de lo contrario no podrá acceder a estas.

### Inicio

Página de inicio donde se muestra una portada con el nombre del equipo, la foto de los integrantes y el logo de la UNAB en la parte inferior.

<center>

**Versión Web**

![Portada](./img/inicio_web.png)

**Versión Móvil**

![Portada móvil](./img/inicio_movil.png)

</center>

Código utilizado en la página de inicio

```Typescript
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../iniciar-sesion/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**Getter de la informacion de usuario qué está en el servicio definido en los pasos anteriores.
   * En el getter esta la información que se muestra en la parte del HTML.
  */
  get infoUser() {
    return this.authService.user.user;
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {}
}

```

### Perfil

En esta página se encuentra un formulario por medio del cual se puede editar la información básica del usuario, para poder editar los campos se debe presionar un botón en la esquina superior derecha.

<center>

**Versión Web**

![Perfil](./img/perfil_web.png)

**Versión Móvil**

![Perfil](./img/perfil_movil.png)

</center>

**Código utilizado en la página del perfil**

Definición del servicio para subir una guardar el perfil del usuario en el backend

```Typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { catchError, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

import { ProfileData } from 'src/app/usuarios/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://dev36-auth.herokuapp.com';
  private _user!: (AuthResponse | SocialUser | any );

  /**Getter del usuario*/
  get user() {
    return { ... this._user }
  }

  constructor(private httpClient: HttpClient) { }

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
 
}


```

Implementación del servicio para subir guardar el perfil del usuario en el backend

```Typescript
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../../../iniciar-sesion/services/auth.service';
import { ProfileData } from '../../interfaces/user.interface';
import getDepartments from '../../functions/departments';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit, AfterViewInit {

  dbUser = this.authService.user.user;
  editProfile: ProfileData | any;
  disabledItem: boolean = true;
  disableAll: boolean = false;
  file: File;
  photoSelected: string | ArrayBuffer;
  flag: number = 0;
  departments: object[] = [];
  municipalities: object[] = [];
  countries: object[] = [];
  skills: string[] = [
    "Creatividad",
    "Persuasión",
    "Colaboración",
    "Adaptabilidad",
    "Paciencia",
    "Comunicación",
    "Velocidad",
    "Fortaleza",
    "Proactividad",
    "Sociabilidad"
  ]

  constructor(
    private authService: AuthService,
    private userService: UsuarioService
  ) {
    //Desestructuracion de la informacion del usuario traida de la base de datos 
    let {
      cc,
      address,
      dateOfBirth,
      city,
      department,
      country,
      ZIP,
      profession,
      description,
      skills,
      image
    } = this.dbUser.profile;
    //Asignacion de los valores desestructurados al usuario que se enviara a la base de datos
    this.editProfile = {
      name: this.dbUser.name,
      cc,
      address,
      dateOfBirth,
      city,
      department,
      country,
      ZIP,
      profession,
      skills,
      description,
      image
    }
  }

  ngOnInit(): void {
    this.departments = getDepartments();
    this.selectedDepartment();
    this.countries = [{ country: 'Colombia' }];
  }
  /**Funciones que se activan al iniciar el contenido de las vistas */
  ngAfterViewInit(): void {
    //Contar skills que ya tiene el usuario guardados
    this.contarChecks.putActiveFromBd(this.dbUser.profile.skills);
    this.contarChecks.flagGuardian();
    //Cargar imagen
    this.authService.getImageFile(this.dbUser.profile.image).subscribe(
      image => {
        const reader = new FileReader();
        reader.onload = e => this.photoSelected = reader.result
        reader.readAsDataURL(image);
      }
    )
  }
  /**Funcion que trae los municipios cuando se selecciona un departamento */
  selectedDepartment() {
    this.userService.byDepartment(this.editProfile.department)
      .subscribe(departments => {
        this.municipalities = [];
        departments.forEach(({ municipio }) => {
          this.municipalities.push({ municipio });
        });
      });
  }
  /** FUncion que me permite actualizar el perfil del usuario*/
  sendProfile(formulario) {
    if (this.file != undefined) {
      this.authService.uploadImage(this.dbUser.id, this.file, localStorage.getItem('provider') || '')
        .pipe(
          switchMap(data => {
            return this.authService.userProfile(this.editProfile, this.dbUser.id, localStorage.getItem('provider') || '')
          })
        ).subscribe(data => {
          if (data.ok == false) {
            Swal.fire('Error', data.msg, 'error');
          } else {
            Swal.fire('Todo en orden :)', data.msg, 'success');
          }
        });
    } else {
      this.authService.userProfile(this.editProfile, this.dbUser.id, localStorage.getItem('provider') || '')
        .subscribe(data => {
          if (data.ok == false) {
            Swal.fire('Error', data.msg, 'error');
          } else {
            Swal.fire('Todo en orden :)', data.msg, 'success');
          }
        });

    }
  }
  /**
   * Funcion que recibe la foto que el usuario sube y da un preview
   * @param foto - Informacion de la foto subida por el usuario
   */
  onPhotoSelected(foto) {
    if (foto.target.files && foto.target.files[0]) {
      const { size, type } = foto.target.files[0]
      const imageType = type.split('/')[1];

      if (size > 1000000 || imageType != 'jpg' && imageType != 'png') {
        Swal.fire('Unable to upload your image', 'The image must be in jpg or png format and size less than 1 MB.', 'warning');
        return false;
      }
      //Previsualizacion de la imagen
      this.file = foto.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
  /**Funcion para que los campos del perfil  sean editables */
  editFields(btnEdit) {
    btnEdit.classList.toggle('btn-profile-active');
    //Funcion que me toma el div que cubre los skills y le togglea una clase para que sean editables o no
    document.querySelectorAll('.cover-select-class').forEach(element => {
      element.classList.toggle('cover');
    });
    this.disabledItem = !this.disabledItem;
    return false;
  }
  /**Funcion que toma la fecha del componente de primeng y se la establece al usuario a editar */
  onChangeDate(fecha) {
    this.editProfile.dateOfBirth = fecha;
  }
  /**Objeto literal que me permite controlar los checkbox
   * @property { function } url - Funcion retorna un array con los checkbox
   * @property { function } true - Funcion suma una habilidad al array de habilidades de usuario
   * @property { function } false - Funcion resta una habilidad al array de habilidades de usuario
   * @property { function } active - Funcion que remueve el atributo disabled a los checkbox
   * @property { function } disable - Funcion que añade el atributo disabled a los checkbox
   * @property { function } putActiveFromBd - Funcion que pone el atributo checkeck del checkbox en true si ya lo tenia el usuario
   * @property { function } flagGuardian - Funcion se fija si ya tiene 3 habilidades seleccionadas al cargar la info del usuario
   * @property { function } null - Funcion de error en caso de que se envie un valor que no valido
   */
  contarChecks = {
    url: () => {
      let checkbox = document.querySelectorAll('.form-check-input');
      return checkbox;
    },
    true: (value: string) => {
      this.flag += 1;
      if (!this.editProfile.skills.includes(value)) {
        this.editProfile.skills.push(value)
      };
    },
    false: (checkbox) => {
      this.flag -= 1;
      this.editProfile.skills.splice(this.editProfile.skills.indexOf(checkbox), 1);
    },
    "active": () => {
      this.contarChecks.url().forEach((element: any) => {
        if (!element.checked) {
          element.removeAttribute('disabled');
        };
      });
    },
    "disable": () => {
      this.contarChecks.url().forEach((element: any) => {
        if (!element.checked) {
          element.setAttribute('disabled', 'true');
        };
      });
    },
    putActiveFromBd: (arr) => {
      this.contarChecks.url().forEach((element: any) => {
        if (arr.includes(element.value)) {
          element.checked = true;
          this.contarChecks.true(element.value);
        }
      });
    },
    flagGuardian: () => {
      if (this.flag > 2) {
        return this.contarChecks.disable();
      }
    },
    null: () => this.flag = this.flag
  }
  /**Funcion que se ejecuta cada vez que se selecciona un checkbox */
  seleccionado(checkbox) {
    this.contarChecks[checkbox.target.checked](checkbox.target.value);
    return (this.flag < 3) ? this.contarChecks['active']() : this.contarChecks['disable']()
  }
}
```


### Registros

Esta es la página donde se muestra la información que el usuario añadio en el Perfil

<center>

**Versión Web**

![Registros](./img/registros_web.png)

**Versión Móvil**

![Registros Móvil](./img/registros_movil.png)

</center>

**Código utilizado en la página de registros**

Definición del servicio para traer la imágen del usuario del backend

```Typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://dev36-auth.herokuapp.com';

  constructor(private httpClient: HttpClient, private authService: SocialAuthService) { }
  
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
}

```

Implementación del servicio para traer la imágen del usuario del backend

```Typescript
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../iniciar-sesion/services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: []
})
export class HistoryComponent implements OnInit {

  // Variable en la que se guarda la imagen que es mostrada en el HTML
  photoSelected: string | ArrayBuffer;

  /**Metodo que devuelve la información del usuario que es mostrada en el HTML */
  get userInfo() {
    return this.authService.user;
  }
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getImageFile(this.userInfo.user.profile.image).subscribe(
      image => {
        const reader = new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(image);
      }
    )
  }
}

```

### Video
### Blog
### Municipios COL
### Interfaces Involucradas





## Menús
### Menú Publico
### Menú de Dashboard
### Menú de WordPress
### Interfaces Involucradas




## Rest Web Services
### Municipios y departamentos de Colombia
### WordPress

