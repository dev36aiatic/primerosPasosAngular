import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../iniciar-sesion/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  
  constructor(private authService:AuthService, private router: Router){}

  canActivate(): Observable<boolean> | boolean  {


    console.log('Can activate');
    
    return this.authService.validateToken().pipe(
      tap(ok =>{
        if(!ok){
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }

  canLoad(): Observable<boolean> | boolean {
    console.log('Can load');
    
    return this.authService.validateToken().pipe(
      tap(ok =>{
        if(!ok){
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
  

  
}
