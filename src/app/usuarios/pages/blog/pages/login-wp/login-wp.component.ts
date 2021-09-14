import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { WordpressService } from '../../services/wordpress.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-wp',
  templateUrl: './login-wp.component.html',
  styleUrls: ['./login-wp.component.css']
})
export class LoginWpComponent implements OnInit {

  myLogin: FormGroup = this.formBuilder.group({
    username: ['lynross', [Validators.required]],
    password: ['F64mqj8gXoqz8ai8zj', [Validators.required]]
  });
  isWpLogged: boolean = false;
  loading: boolean = false;

  constructor(private wpService: WordpressService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    /**Si ya inicio sesion que me rediriga a la pagina de añadir post */
    if(localStorage.getItem('wp-token')){
      this.isWpLogged = true;
      this.router.navigateByUrl('dashboard/blog');
      return;
    }
    this.isWpLogged = false;
  }

  /**
   * Funcion que se ejecuta cuando el usuario de click en iniciar sesion en wordpress
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
