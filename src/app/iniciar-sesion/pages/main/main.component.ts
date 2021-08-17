import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  get userOn(){
    return !!localStorage.getItem('token');
  }
  constructor(private authService: AuthService, private router: Router) { 
    /**Condicion para redirigir al usuario si ya inicio sesion previamente*/
    if(this.userOn){
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit(): void {
    
  }

}
