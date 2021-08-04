import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styles: [
  ]
})
export class FormularioLoginComponent {

  myLogin: FormGroup = this.formBuilder.group({
    email: ['dev36@aiatic.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }


  login() {
 /*    console.log(this.myLogin.value); */
    const { email, password } = this.myLogin.value;

    this.authService.login(email, password).subscribe(resp => {

      if (resp.ok === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire('Error',resp,'error');
      }

    });

  }
}
