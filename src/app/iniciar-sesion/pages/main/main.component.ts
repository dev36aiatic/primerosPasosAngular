import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { 
    
    //Condicion para redirigir al usuario si ya inicio sesion previamente
    if(localStorage.getItem('token') || localStorage.getItem('social-token')){
      this.router.navigateByUrl('/dashboard');
    }
    
  }

  ngOnInit(): void {

  }

}
