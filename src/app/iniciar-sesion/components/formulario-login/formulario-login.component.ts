import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

//Facebook and Google login modules
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { SocialUser } from "angularx-social-login";


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
    email: ['dev36@aiatic.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  private loggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private googleFacebookAuth: SocialAuthService) { }


  ngOnInit(): void {
    this.authService.loginGoogle().subscribe(user => {

      if (this.authService.isLoggedIn) {

        this.router.navigateByUrl('/dashboard');

      } else {

        this.router.navigateByUrl('/');
      }

    });
  }

  signInWithGoogle(): void {
    this.googleFacebookAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.googleFacebookAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  login() {
    /*    console.log(this.myLogin.value); */
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
