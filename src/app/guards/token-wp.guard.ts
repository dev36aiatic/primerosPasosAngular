import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WordpressService } from '../usuarios/pages/blog/services/wordpress.service';

@Injectable({
  providedIn: 'root'
})
export class TokenWpGuard implements CanActivate {

  constructor(private wpService: WordpressService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    console.log('Can Activate New Post')
    return this.wpService.validateWpToken()
      .pipe(
        tap(resp => {
          if (!resp) {
            this.wpService.wpLogout();
            this.router.navigateByUrl('dashboard/blog/iniciar-sesion-wp');
          }
        })
      )
  }

}
