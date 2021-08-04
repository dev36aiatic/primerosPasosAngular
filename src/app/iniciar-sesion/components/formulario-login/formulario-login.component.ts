import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styles: [
  ]
})
export class FormularioLoginComponent {

  myLogin: FormGroup = this.formBuilder.group({
    email:   ['dev36@aiatic.com', [Validators.required, Validators.email]],
    password:['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private formBuilder: FormBuilder) { }

 
  login(){
    console.log(this.myLogin.value);
    console.log(this.myLogin.valid);
    
  }
}
