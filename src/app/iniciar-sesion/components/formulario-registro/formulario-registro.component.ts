import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html'
})
export class FormularioRegistroComponent {

  mySignup: FormGroup = this.fb.group({
    name:     ['Mauricio', [ Validators.required, Validators.minLength(2)] ],
    email:    ['dev36@aiatic.com', [ Validators.required, Validators.email] ],
    password: ['123456', [ Validators.required, Validators.minLength(6)] ]
  })

  constructor(private fb: FormBuilder) { }


  signup() {
    console.log(this.mySignup.value);
    console.log(this.mySignup.valid);

  }
}
