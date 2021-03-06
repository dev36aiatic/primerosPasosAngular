import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { WordpressService } from '../../services/wordpress.service';
import { WordpressUser } from '../../interfaces/logged-wp-user.interface';
import { WpCategory } from '../../interfaces/wp-category.interface';

@Component({
  selector: 'app-menu-wp',
  templateUrl: './menu-wp.component.html',
  styleUrls: ['./menu-wp.component.css']
})
export class MenuWpComponent implements OnInit {

  @Input() wpUser: WordpressUser;
  @Input() isWPLogged: boolean;
  loading: boolean = undefined;
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

  constructor(
    private wpService: WordpressService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ slug }) => {
      if (slug) {
        this.linkTo = '/dashboard/blog/iniciar-sesion-wp';
      } else {
        this.linkTo = './iniciar-sesion-wp';
      }
    });
  }

  //Revisa si el usuario que pasa el componente padre blog ya le paso el valor
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isWPLogged.currentValue != undefined) {
      this.loading = false;
    }

    if (changes.wpUser.currentValue != undefined) {
      this.loading = false;
      if (this.wpUser["capabilities"]["administrator"]) {
        this.items = this.adminMenu();
      } else {
        this.items = this.customerMenu();
      }
    }
  }

  /**Funcion que permite o no ir a la pagina de agregar post */
  addPost() {
    if (this.wpUser["capabilities"]["administrator"]) {
      this.router.navigateByUrl('dashboard/blog/anadir-entrada');
    }
    else if (!this.wpUser) {
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
   * Funcion para agregar una nueva categor??a
   */
  newCategory() {
    this.wpService.newCategory(this.formCategory.value).subscribe(category => {
      if (category["error"]) {
        Swal.fire('Oops', category["msg"], 'error');
        return false;
      }
      if (
        this.router.url == '/dashboard/blog/anadir-entrada'
        || this.router.url.indexOf('editar-entrada') > -1
        || this.router.url.indexOf('administrar-categorias') > -1
      ) {
        this.wpService.getCategories().subscribe(categories => this.onUpdateCategories.emit(categories));
      }
      Swal.fire('Todo en orden!', 'La categoria ha sido a??adida con exito!', 'success');
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
          label: 'A??adir entrada',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.addPost();
          }
        },
        {
          label: 'Categor??as',
          icon: 'pi pi-external-link',
          items: [
            {
              label: 'A??adir',
              icon: 'pi pi-fw pi-plus',
              command: () => {
                this.showResponsiveDialog();
              }
            },
            {
              label: 'Administrar',
              icon: 'pi i pi-cog',
              routerLink: '/dashboard/blog/administrar-categorias'
            }
          ]
        }
        ]
      },
      {
        label: 'Ajustes',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Se tu propio jefe',
            icon: 'pi pi-user-edit',
            command: () => {
              Swal.fire('Empanadas', 'Por el momento esta opcion es solo decoraci??n!', 'info')
            }
          },
          {
            separator: true
          },
          {
            label: 'Cerrar sesi??n',
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
        label: 'Ajustes',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Se tu propio jefe',
            icon: 'pi pi-user-edit',
            command: () => {
              Swal.fire('Empanadas', 'Por el momento esta opcion es solo decoraci??n!', 'info')
            }
          },
          {
            separator: true
          },
          {
            label: 'Cerrar sesi??n',
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