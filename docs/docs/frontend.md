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
private baseUrl: string = 'https://dev36-auth.herokuapp.com';

/**
 * Metodo para registrar un usuario
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
```

**Utilización del servicio en el frontend para crear un nuevo usuario en el backend**

```Typescript
//Se define el formulario para capturar los datos
mySignup: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
});

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
```



### Iniciar sesión

Esta es la página que carga por defecto cuando el usuario abre la [página de la aplicación](https://dev36-auth.herokuapp.com)

![Página inicio de sesión](./img/iniciar-sesion-web.jpg)

Se observa un formulario el cual solicita el correo y la contraseña con el fin de acceder a la [página de inicio de la Dashboard](#inicio)





### Interfaces Involucradas






## Páginas privadas
### Inicio
### Perfil
### Registros
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

