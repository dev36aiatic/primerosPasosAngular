import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { WordpressService } from '../../services/wordpress.service';
import { WordpressUser } from '../../interfaces/logged-wp-user.interface';
import { WpCategory } from '../../interfaces/wp-category.interface';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  // Se define el formulario para capturar la información del post
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
  post!: Post;
  photoSelected: string | ArrayBuffer;
  wpUser!: WordpressUser;
  authors: object[];
  status: object[];
  file: File;
  categories: WpCategory[] = [];
  loading = false;
  slug: string;
  exist: boolean = true;
  isWPLogged: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private wpService: WordpressService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Toma el parametro de la url y busca el post
    this.route.params.pipe(
      switchMap(({ slug }) => {
        this.slug = slug;
        return this.wpService.getSinglePost(slug);
      })
    ).subscribe(post => {
      if (post[0]) {
        // Expresión regular para quitar etiquetas html que vienen en el extracto
        const regex = /(<([^>]+)>)/ig;

        this.exist = true;
        this.post = post[0];
        if (post[0].featured_media != 0) {
          this.wpService.getMedia(post[0].featured_media).subscribe(media => {
            this.photoSelected = media["guid"]["rendered"];
          })
        }
        // Settea los valores del post en el formulario
        this.formPost.setValue({
          title: post[0].title.rendered,
          author: post[0]?.["_embedded"]['author']['0'].id,
          slug: post[0].slug,
          content: post[0].content.rendered,
          excerpt: post[0].excerpt.rendered.replace(regex, ""),
          status: post[0].status,
          categories: post[0].categories,
          featured_media: post[0].featured_media
        });
      } else {
        this.exist = false;
      }
    });
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
    // Trae las categorías de WordPress
    this.wpService.getCategories().subscribe(categories => {
      categories.forEach(({ name, id }) => {
        this.categories.push({ name, id });
      })
    });
    // Trae los autores de Wordpress
    this.wpService.getAllUsers().subscribe(users => this.authors = users);
    //Define los valores del posible estado de la entrada
    this.status = [
      {
        status: 'Publicar',
        value: 'publish'
      }
    ]
  }
  /**Funcion para actualizar un post */
  updatePost() {
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
              return this.wpService.updateSinglePost(this.formPost.value, this.post.id);
            }
          })
        ).subscribe(post => {
          this.newPostHandleError(post);
        })
    } else {
      this.wpService.updateSinglePost(this.formPost.value, this.post.id).subscribe(post => {
        this.newPostHandleError(post);
      });
    }
  }
  /**
   * Función para saber si manejar el post si existe
   * @param post - Post
   * @returns - Mensaje de error si el post no existe, de lo contrario mensaje de todo correcto
   */
  newPostHandleError(post: any) {
    if (post["error"]) {
      Swal.fire('Oops!', post["error"], 'error');
      return;
    } else {
      Swal.fire('Todo en orden!', 'El post ha sido actualizado sin problemas!', 'success');
    }
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
    this.categories = [];
    categories.forEach(({ name, id }) => {
      this.categories.push({ name, id });
    })
  }
  /**Funcion para borrar la imagen */
  deleteImage() {
    this.file = undefined;
    this.photoSelected = undefined;
  }
}
