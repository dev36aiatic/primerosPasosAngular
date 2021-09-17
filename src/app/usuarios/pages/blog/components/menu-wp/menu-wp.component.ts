import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { WordpressService } from '../../services/wordpress.service';
import { LoggedWpUser } from '../../interfaces/logged-wp-user.interface';
import { WpCategory } from '../../interfaces/wp-category.interface';

@Component({
  selector: 'app-menu-wp',
  templateUrl: './menu-wp.component.html',
  styleUrls: ['./menu-wp.component.css']
})
export class MenuWpComponent implements OnInit {
  wpUser: LoggedWpUser | boolean;
  loading: boolean = undefined;
  isWPLogged: boolean = undefined;
  items: MenuItem[];
  load: boolean = false;
  linkTo: string;
  displayResponsive: boolean = false;
  @Output() onUpdateCategories: EventEmitter<WpCategory[]> = new EventEmitter();
  formCategory: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    slug: ['', [Validators.required]],
    description: ['']
  });

  constructor(private wpService: WordpressService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(({ slug }) => {
      if (slug) {
        this.linkTo = '/dashboard/blog/iniciar-sesion-wp';
      } else {
        this.linkTo = './iniciar-sesion-wp';
      }
    });

    //Valida si el usuario inicio sesion
    this.wpService.validateWpToken()
      .pipe(
        switchMap(logged => {
          this.isWPLogged = logged;
          return (logged) ? this.wpService.getWPUser() : of(false)
        })
      ).subscribe(user => {
        this.loading = false;
        if (user != false) {
          this.wpUser = user;
          if (this.wpUser["capabilities"]["administrator"]) {
            this.items = this.adminMenu();
          } else {
            this.items = this.customerMenu();
          }
        }
      });
  }

  /**Funcion que permite o no ir a la pagina de agregar post */
  addPost() {
    if (this.isWPLogged && this.wpUser["capabilities"]["administrator"]) {
      this.router.navigateByUrl('dashboard/blog/anadir-post');
    }
    else if (!this.isWPLogged) {
      this.router.navigateByUrl('dashboard/blog/iniciar-sesion-wp');
    } else {
      this.router.navigateByUrl('dashboard/blog');
    }
  }

  /**Metodo para cerrar sesion en wordpress */
  signoutWP() {
    this.wpService.wpLogout();
    this.router.navigateByUrl('dashboard/blog');
    if (this.router.url == '/dashboard/blog') {
      window.location.reload();
    }
  }

  /**
   * Funcion para agregar una nueva categoría
   */
  newCategory() {
    this.wpService.newCategory(this.formCategory.value).subscribe(category => {
      if (category["error"]) {
        Swal.fire('Oops', category["msg"], 'error');
        return false;
      }
      if (this.router.url == '/dashboard/blog/anadir-post' || this.router.url.indexOf('editar-post') > -1) {
        this.wpService.getCategories().subscribe(categories => this.onUpdateCategories.emit(categories));
      }
      Swal.fire('Todo en orden!', 'La categoria ha sido añadida con exito!', 'success');
    });
  }

  /**Funcion para mostrar el modal de nueva categoria */
  showResponsiveDialog() {
    this.displayResponsive = true;
  }

  /**Funcion que retorna el menu del administrador */
  adminMenu() {
    return [
      {
        label: 'Blog',
        icon: 'fas fa-blog',
        routerLink: '/dashboard/blog'
      },
      {
        label: 'Entradas',
        icon: 'pi pi-bookmark',
        items: [{
          label: 'Añadir entrada',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.addPost();
          }
        },
        {
          label: 'Añadir categoría',
          icon: 'pi pi-external-link',
          command: () => {
            this.showResponsiveDialog();
          }
        }
        ]
      },
      {
        label: 'Opciones',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Se tu propio jefe',
            icon: 'pi pi-user-edit',
            command: () => {
              Swal.fire('Empanadas', 'Por el momento esta opcion es solo decoración!', 'info')
            }
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              this.signoutWP();
            }
          }

        ]
      }
    ];
  }
  /**Funcion que retorna el menu del cliente o usuario basico */
  customerMenu() {
    return [
      {
        label: 'Blog',
        icon: 'fas fa-blog',
        routerLink: '/dashboard/blog'
      },
      {
        label: 'Opciones',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Se tu propio jefe',
            icon: 'pi pi-user-edit',
            command: () => {
              Swal.fire('Empanadas', 'Por el momento esta opcion es solo decoración!', 'info')
            }
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              this.signoutWP();
            }
          }

        ]
      }
    ];
  }
}