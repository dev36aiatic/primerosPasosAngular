import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'login-wp',
  templateUrl: './login-wp.component.html',
  styleUrls: ['./login-wp.component.css']
})
export class LoginWpComponent implements OnInit {

  myLogin: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  isWpLogged: boolean = false;
  loading: boolean = false;

  constructor(private wpService: WordpressService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    //Si ya inicio sesion que redirige a la pagina de inici del blog  
    if (localStorage.getItem('wp-token')) {
      this.isWpLogged = true;
      this.router.navigateByUrl('dashboard/blog');
      return;
    }
    this.isWpLogged = false;
  }

  /**
   * Funcion para iniciar sesión en wordpress
   */
  iniciarSesionWp() {
    this.isWpLogged = true;
    const { username, password } = this.myLogin.value;

    this.wpService.wordpressLogin(username, password).subscribe(data => {
      if (data.error) {
        Swal.fire('Oops', 'Parece que el usuario o contraseña son incorrectos, por favor cambialos e  intenta de nuevo.', 'error');
        this.isWpLogged = false;
        return false;
      }
      this.router.navigateByUrl('dashboard/blog');
    });
  }

}
