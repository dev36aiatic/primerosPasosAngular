# Documentación del proyecto Angular con Wordpress

## Introducción

Esta es la documentación del proyecto [**Dashboard | Practicas II Semestre UNAB**](https://dev36-auth.herokuapp.com/), realizado
en la empresa **A&A Soluciones TIC**, utilizando MKDOCS para publicarlo
en ReadTheDocs. En este proyecto se utilizó Angular para el Frontend, en la parte del backend se utilizó NodeJS, TypeORM con base de datos MySQL.  También se hizo uso de la [API REST de los departamentos y municipios de Colombia](frontend#municipios-col) y la [API REST de WordPres](frontend#blog).

## Contenido

* [Frontend](frontend.md) 
    * [Introducción](frontend#introducción)
    * [Versión de Angular](frontend#version-de-angular)
        * [Versión de los paquetes](frontend#version-de-los-paquetes)
    * [Páginas publicas](frontend#paginas-publicas)
        * [Registrarse](frontend#registrarse)
            * [Código utilizado para crear un usuario](frontend#codigo-utilizado-para-crear-un-usuario)
        * [Iniciar sesión](frontend#iniciar-sesion)
            * [Inicio de sesión por medio de la aplicación](frontend#inicio-de-sesion-por-medio-de-la-aplicacion)
            * [Inicio de sesión con redes sociales](frontend#inicio-de-sesion-con-redes-sociales)
            * [Inicio de sesión con Facebook o Google](frontend#inicio-de-sesion-con-facebook-o-google)
        * [Interfaces Involucradas](frontend#interfaces-involucradas)
    * [Páginas privadas](frontend#paginas-privadas)
        * [Inicio](frontend#inicio)
        * [Perfil](frontend#perfil)
        * [Registros](frontend#registros)
        * [Video](frontend#videos)
        * [Blog](frontend#blog)
        * [Municipios COL](frontend#municipios-col)
        * [Interfaces Involucradas](frontend#interfaces-involucradas)
    * [Menús](frontend#menus)
        * [Menú Publico](frontend#menu-publico)
        * [Menú de Dashboard](frontend#menu-de-dashboard)
        * [Menú de WordPress](frontend#menu-de-wordpress)
        * [Interfaces Involucradas](frontend#interfaces-involucradas)
    * [Guards](frontend#guards)
        *[Token aplicación](frontend#token-aplicacion)
            *[Validar token creado por la aplicación](frontend#validar-token-creado-por-la-aplicacion)
            *[Validar token creado por Google o Facebook](frontend#validar-token-creado-por-google-o-facebook)
        *[Token enviado por WordPress](frontend#token-enviado-por-wordpress)

* Backend
    * Introducción
    * Controladores
        * Controlador de la aplicación
    * Entidades
        * Entidad de los usuarios creados por medio de la aplicación
        * Entidad de los usuarios creados por medio de Google o Facebook
        * Entidad del perfil de los usuarios
    * Helpers
        * Borrar imagen de perfil del usuario
        * Generar JWT
        * Información del usuario
    * Middlewares
        * Subir imagén de perfil
        * Validar campos de los formularios de inicio de sesión y registro
        * Validar JWT
    * Carpeta Public
    * Rutas
    * Carpeta de imágenes de los perfiles
    

## Repositorio

Para el manejo de las versiones del proyecto se utilizó Git y GitHub, puedes ver el repositorio haciendo
click [aquí](https://github.com/dev36aiatic/primerosPasosAngular)

### Servidor de desarrollo Frontend

Pasos para levantar el servidor de desarrollo de Angular:

1. `git clone https://github.com/dev36aiatic/primerosPasosAngular.git`
2.  Abrir consola de comandos sobre la carpeta del proyecto clonado en el paso anterior
2. `npm install`  - Instala las dependecias del proyecto de Angular
3. `ng serve -o` - Abre el proyecto una vez esté listo

#### Build de producción
Para generar la build de producción debes abrir la consola de comandos sobre la carpeta del proyecto de angular
y ejecutar el comando `ng build --configuration production`. Esto creará los archivos en la siguiente ruta.

    Angular                     # La carpeta que contiene del proyecto de Angular clonado
        dist/                   
            Angular/
                    index.html  # El index.html del proyecto
                    ...         # Otros archivos del proyecto como el script, estilos css y fuentes.

Una vez creados estos archivos puedes utilizarlos de la forma que desees.


### Servidor de desarrollo Backend

1. `git clone https://github.com/dev36aiatic/primerosPasosAngular.git`
2.  Abrir consola de comandos sobre la carpeta backend que está dentro del proyecto clonado en el paso anterior
3.  `npm install`  - Instala las dependecias del proyecto de NodeJS
4.  Configurar la conexión a la base de datos en el archivo `ormconfig.json`
5.  Configurar las variables de entorno en el archivo .env
5.  `npm run dev` - Corre el servidor del backend

