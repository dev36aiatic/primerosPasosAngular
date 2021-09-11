import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WordpressService } from '../usuarios/services/wordpress.service';

@Injectable({
  providedIn: 'root'
})
export class TokenWpGuard implements CanActivate, CanLoad {

  constructor(private wpService: WordpressService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    console.log('Can Activate New Post')
    return this.wpService.validateWpToken()
      .pipe(
        tap(resp => {
          if (!resp) {
            this.router.navigateByUrl('dashboard/blog/iniciar-sesion-wp');
          }
        })
      )
  }

  canLoad(): Observable<boolean> | boolean {
    console.log('Can Load New Post')
    return this.wpService.validateWpToken()
      .pipe(
        tap(resp => {
          if (!resp) {
            this.router.navigateByUrl('dashboard/blog/iniciar-sesion-wp');
          }
        })
      )
  }
}
