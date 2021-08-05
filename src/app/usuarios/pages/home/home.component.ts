import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../iniciar-sesion/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  get infoUser(){
    return this.authService.user;
  }
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   
    
    
    
  }

}
