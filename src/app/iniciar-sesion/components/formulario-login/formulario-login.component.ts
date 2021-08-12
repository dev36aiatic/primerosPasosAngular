import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

//Facebook and Google login modules
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";



//Alerts module
import Swal from 'sweetalert2'


@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styles: [
  ]
})
export class FormularioLoginComponent implements OnInit {

  myLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private googleFacebookAuth: SocialAuthService) { }


  ngOnInit(): void {
    /**Funcion que se subscribe y obtiene al usuario cuando este inicia sesion con facebook o google */
    this.authService.loginGoogle().subscribe(user => {

      if(user == null){
        if(localStorage.getItem('provider')){
          localStorage.clear();
        }
      }

      if ((user != null)) {

        this.router.navigateByUrl('/dashboard');

      }
     
    });
  }

  /**Funcion que abre la pantalla de iniciar sesion con google */
  signInWithGoogle(): void {
    this.googleFacebookAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 /**Funcion que abre la pantalla de sesion con facebook*/
  signInWithFB(): void {
    this.googleFacebookAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  /**Funcion para iniciar sesion*/
  login() {
    const { email, password } = this.myLogin.value;

    this.authService.login(email, password).subscribe(resp => {

      if (resp.ok === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire('Error', resp, 'error');
      }

    });

  }
}
