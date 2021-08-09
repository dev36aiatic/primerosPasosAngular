import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../iniciar-sesion/services/auth.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router,
    private socialAuthService: SocialAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    console.log('Can activate');
    /* Metodos que dependiendo si inicie sesion con una cuenta creada en mi base de datos 
    o me autentique con facebook y google me validan si las rutas deben ser activadas y mostradas */

    if (!localStorage.getItem('token') && this.authService.getProvider.length <=0 ) {
      this.router.navigateByUrl('/auth');
    }
    if (localStorage.getItem('token')) {
      return this.authService.validateToken().pipe(
        tap(ok => {
          if (!ok) {
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
        })
      );
    }
    if (this.authService.getProvider == 'GOOGLE') {
      return this.authService.validateAuthGoogle().pipe(
        tap(ok => {
          if (!ok) {
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
        })
      );

    }
    if (this.authService.getProvider == 'FACEBOOK') {
      return this.authService.validateAuthFacebook().pipe(
        tap(ok => {
          if (!ok) {
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
        })
      );
    } 



  }

  canLoad(): Observable<boolean> | boolean {
    console.log('Can load');
   
    if (!localStorage.getItem('token') && this.authService.getProvider.length <=0 ) {
      this.router.navigateByUrl('/auth');
    }
    if (localStorage.getItem('token')) {
      return this.authService.validateToken().pipe(
        tap(ok => {
          if (!ok) {
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
        })
      );
    }
    if (this.authService.getProvider == 'GOOGLE') {
      return this.authService.validateAuthGoogle().pipe(
        tap(ok => {
          if (!ok) {
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
        })
      );

    }
    if (this.authService.getProvider == 'FACEBOOK') {
      return this.authService.validateAuthFacebook().pipe(
        tap(ok => {
          if (!ok) {
            localStorage.clear();
            this.router.navigateByUrl('/auth');
          }
        })
      );
    } 


  }



}
