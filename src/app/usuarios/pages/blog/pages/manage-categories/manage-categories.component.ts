import { Component, OnInit } from '@angular/core';
import { WordpressUser } from '../../interfaces/logged-wp-user.interface';
import { WordpressService } from '../../services/wordpress.service';
import { WpCategory } from '../../interfaces/wp-category.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  wpUser!: WordpressUser;
  isWPLogged: boolean;
  formCategory: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    slug: ['', [Validators.required]],
    description: ['']
  });
  isEditingRow: boolean = false;
  savingChanges: boolean;

  constructor(private wpService: WordpressService, private formBuilder: FormBuilder) { }

  categories: WpCategory[] = [];

  ngOnInit(): void {
    this.wpService.getWPUser().subscribe(user => {
      if (user["error"]) {
        this.isWPLogged = false;
        this.wpService.wpLogout();
      } else {
        this.wpUser = user;
        this.isWPLogged = true;
      }
    });

    this.wpService.getCategories().subscribe(categories => {
      categories.forEach(({ id, name, description, slug }) => {
        this.categories.push({ id, name, description, slug });
      });
    });
  }
  /**
   * Funcion que toma los vales de la categoría a editar y lo pone en el formulario a enviar para actualizar
   */
  onRowEditInit(category: WpCategory) {
    this.isEditingRow = true;
    this.formCategory.setValue({
      name: category.name,
      slug: category.slug,
      description: category.description
    });

  }
  /**
   * Función para guardar los nuevos datos de la categoría
   * @param category - Información antigua de la categoría
   */
  onRowEditSave(category: WpCategory) {
    this.savingChanges = true;
    this.wpService.updateCategory(this.formCategory.value, category.id)
      .pipe(
        switchMap(category => {
          if (category["error"]) {
            Swal.fire('Ha ocurrido un error', category["error"]["message"], 'error');
            return;
          } else {
            return this.wpService.getCategories();
          }
        })
      ).subscribe(categories => {
        this.categories = [];
        categories.forEach(({ id, name, description, slug }) => {
          this.categories.push({ id, name, description, slug });
        });
        this.isEditingRow = false;
        this.savingChanges = false;
        setTimeout(() => {
          this.savingChanges = undefined;
        }, 60000);
      });
  }
  /**
   * Función para cancelar la edición de una categoría
   * @param category - Informacion de la categoría
   * @param index - Indice de la categoría
   */
  onRowEditCancel(category: WpCategory, index: number) {
    this.isEditingRow = false;
    this.formCategory.reset();
  }
  /**
  * Funcion que recibe del hijo menu-wp las categorias mas recientes 
  * @param categories - Categorias actualizadas
  */
  updateCategories(categories: WpCategory[]) {
    this.categories = [];
    categories.forEach(({ id, name, description, slug }) => {
      this.categories.push({ id, name, description, slug });
    });
  }
}
