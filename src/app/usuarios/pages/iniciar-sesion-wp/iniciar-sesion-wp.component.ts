import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { WordpressService } from '../../services/wordpress.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion-wp',
  templateUrl: './iniciar-sesion-wp.component.html',
  styleUrls: ['./iniciar-sesion-wp.component.css']
})
export class IniciarSesionWpComponent implements OnInit {

  myLogin: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  loading: boolean = false;

  constructor(private wpService: WordpressService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  iniciarSesionWp() {
    this.loading = true;
    const { username, password } = this.myLogin.value;

    this.wpService.wordpressLogin(username, password).subscribe(data => {
      if (data.error) {
        Swal.fire('Oops', 'Parece que el usuario o contraseña son incorrectos, por favor cambialos e  intenta de nuevo.', 'error');
        this.loading = false;
        return false;
      }
      this.loading = false;
      this.router.navigateByUrl('dashboard/blog/añadir-post');
    });
  }

}
