import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../iniciar-sesion/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router,
    private socialAuthService: SocialAuthService) { }

  /** Los metodos canActivate (Activar rutas) canLoad (Mostrar contenido de las rutas)
   dependiendo si inicie sesion con una cuenta creada en mi base de datos 
  o me autentique con facebook y google me validan si las rutas deben ser activadas y mostradas */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    console.log('Can activate');

    let logoutObject = {
      "LOGOUT": (ok: boolean) => {
        if (!ok || !localStorage.getItem('token')) {
          if (this.authService.isLoggedIn) {
            this.socialAuthService.signOut();
          }
          this.authService.logout();
          this.router.navigateByUrl('/auth');
        }
      }
    }

    let routesObject = {
      "ownLogin": () => {
        return this.authService.validateToken().pipe(
          tap(ok => {
            logoutObject["LOGOUT"](!!ok);
          })
        );
      },
      "FACEBOOK": () => {
        return this.authService.validateAuthGoogleFb(localStorage.getItem('provider') || '').pipe(
          tap(ok => {
            logoutObject["LOGOUT"](!!ok);
          })
        );
      },
      "GOOGLE": () => {
        return this.authService.validateAuthGoogleFb(localStorage.getItem('provider') || '').pipe(
          tap(ok => {
            logoutObject["LOGOUT"](!!ok);
          })
        );
      },
      "DEFAULT": () => {
        logoutObject["LOGOUT"](!!false);
      }

    }

    return (!!localStorage.getItem('provider')) ? routesObject[localStorage.getItem('provider')]() : routesObject["DEFAULT"]();
    
  }

  canLoad(): Observable<boolean> | boolean {
    console.log('Can load');

    let logoutObject = {
      "LOGOUT": (ok: boolean) => {
        if (!ok || !localStorage.getItem('token')) {
          if (this.authService.isLoggedIn) {
            this.socialAuthService.signOut();
          }
          this.authService.logout();
          this.router.navigateByUrl('/auth');
        }
      }
    }

    let routesObject = {
      "ownLogin": () => {
        return this.authService.validateToken().pipe(
          tap(ok => {
            logoutObject["LOGOUT"](!!ok);
          })
        );
      },
      "FACEBOOK": () => {
        return this.authService.validateAuthGoogleFb(localStorage.getItem('provider') || '').pipe(
          tap(ok => {
            logoutObject["LOGOUT"](!!ok);
          })
        );
      },
      "GOOGLE": () => {
        return this.authService.validateAuthGoogleFb(localStorage.getItem('provider') || '').pipe(
          tap(ok => {
            logoutObject["LOGOUT"](!!ok);
          })
        );
      },
      "DEFAULT": () => {
        console.log('default')
        logoutObject["LOGOUT"](!!false);
      }

    }

    return (!!localStorage.getItem('provider')) ? routesObject[localStorage.getItem('provider')]() : routesObject["DEFAULT"]();
    
  }
}
