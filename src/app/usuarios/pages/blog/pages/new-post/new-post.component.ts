import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { WordpressService } from '../../services/wordpress.service';
import { WordpressUser } from '../../interfaces/logged-wp-user.interface';
import { WpCategory } from '../../interfaces/wp-category.interface';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  formPost: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    slug: ['', [Validators.required]],
    content: ['', [Validators.required]],
    excerpt: ['', [Validators.required]],
    status: ['', [Validators.required]],
    categories: ['', [Validators.required]],
    featured_media: [undefined]
  });
  photoSelected: string | ArrayBuffer;
  wpUser!: WordpressUser;
  isWPLogged: boolean;
  authors: object[];
  status: object[];
  file: File;
  categories: WpCategory[] = [];
  loading = false;

  constructor(private formBuilder: FormBuilder, private wpService: WordpressService) { }

  ngOnInit(): void {
    //Valida si el usuario inicio sesion  y el rol que tiene
    this.wpService.getWPUser().subscribe(user => {
      if (user["error"]) {
        this.isWPLogged = false;
        this.wpService.wpLogout();
      } else {
        this.wpUser = user;
        this.isWPLogged = true;
      }
    });
    this.wpService.getCategories().subscribe(categories => this.categories = categories);
    this.authors = [
      {
        name: 'Lynross',
        id: 1
      }
    ]

    this.status = [
      {
        status: 'Publicar',
        value: 'publish'
      }
    ]
  }

  /**Funcion para crear un nuevo post */
  newPost() {
    this.loading = true;
    if (this.file != undefined) {
      const title = this.file.name.split('.')[0];
      const slug = this.file.name.split('.')[0];
      const author = this.wpUser.id;

      this.wpService.uploadMedia(slug, title, author, this.file)
        .pipe(
          switchMap(image => {
            if (image["error"]) {
              Swal.fire('Oops!', image["error"], 'error');
              return;
            } else {
              this.formPost.get('featured_media').setValue(parseInt(image.id));
              return this.wpService.newPost(this.formPost.value);
            }
          })
        ).subscribe(post => {
          this.newPostHandleError(post);
        })
    } else {
      this.wpService.newPost(this.formPost.value).subscribe(post => {
        this.newPostHandleError(post);
      });
    }
  }

  /**
   * Funcion que recibe un post analiza si hay errores o fue exitoso
   * @param post - Post
   */
  newPostHandleError(post: any) {
    if (post["error"]) {
      Swal.fire('Oops!', post["error"], 'error');
      return;
    } else {
      this.postStored();
      this.deleteImage();
    }
  }

  /**Funcion muestra un mensaje cuando el post se guarda con exito */
  postStored() {
    this.loading = false;
    Swal.fire('Todo en orden!', 'El post ha sido añadido correctamente!', 'success');
    this.formPost.reset();
  }

  /**Funcion que muestra una preview de la imagen principal del post */
  onPhotoSelected(e) {
    if (e.target.files && e.target.files[0] && e.target.files[0].type.includes("image")) {
      this.file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    } else {
      Swal.fire('Error', 'Solo puedes subir imagenes.', 'error');
    }
  }

  /**
   * Funcion que recibe del hijo menu-wp las categorias mas recientes 
   * @param categories - Categorias actualizadas
   */
  updateCategories(categories: WpCategory[]) {
    this.categories = categories;
  }

  /**Funcion para borrar la imagen */
  deleteImage() {
    this.file = undefined;
    this.photoSelected = undefined;
  }
}
