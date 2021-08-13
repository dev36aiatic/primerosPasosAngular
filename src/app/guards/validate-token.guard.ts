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
    //
    if (localStorage.getItem('token')) {
      return this.authService.validateToken().pipe(
        tap(ok => {
          if (!ok) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
    }else{
      return this.authService.validateAuthGoogleFb(localStorage.getItem('provider') || '').pipe(
        tap(ok => {
          if (!ok || !localStorage.getItem('provider') || !localStorage.getItem('social-token')) {
            if(this.authService.isLoggedIn){
              this.socialAuthService.signOut();
            }
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
        })
      );
    }
  }

  canLoad(): Observable<boolean> | boolean {
    console.log('Can load');
   
    if (localStorage.getItem('token')) {
      return this.authService.validateToken().pipe(
        tap(ok => {
          if (!ok) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
    }else{
      return this.authService.validateAuthGoogleFb(localStorage.getItem('provider') || '').pipe(
        tap(ok => {
          if (!ok || !localStorage.getItem('provider') || !localStorage.getItem('social-token')) {
            if(this.authService.isLoggedIn){
              this.socialAuthService.signOut();
            }
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
        })
      );
    }
  }
}
