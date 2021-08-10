import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html'
})
export class FormularioRegistroComponent {

  mySignup: FormGroup = this.fb.group({
    name:     ['', [ Validators.required, Validators.minLength(2)] ],
    email:    ['', [ Validators.required, Validators.email] ],
    password: ['', [ Validators.required, Validators.minLength(6)] ]
  })

  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService) { }

  /**Metodo para registrarse*/
  signup() {

    const { name, email, password } = this.mySignup.value;
  
    this.authService.signup(name,email,password)
    .subscribe(resp => {
      if(resp.ok){
        this.router.navigateByUrl('/dashboard');
      }else{
        Swal.fire(resp,'Error','error');
      }
    })

  }
}
