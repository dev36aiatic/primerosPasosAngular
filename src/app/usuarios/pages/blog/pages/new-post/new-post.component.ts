import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { LoggedWpUser } from '../../interfaces/logged-wp-user.interface';
import { WordpressService } from '../../services/wordpress.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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
  loggedUser!: LoggedWpUser;
  authors: object[];
  status: object[];
  file: File;
  categories: WpCategory[] = [];
  loading = false;

  constructor(private formBuilder: FormBuilder, private wpService: WordpressService, private router:Router) { }

  ngOnInit(): void {
    this.wpService.getWPUser().subscribe(wpUser => this.loggedUser = wpUser);
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

  /**Funcion que se activa cuando el usuario crea un nuevo post */
  newPost() {
    this.loading = true;
    if (this.file != undefined) {
      const title = this.file.name.split('.')[0];
      const slug = this.file.name.split('.')[0];
      const author = this.loggedUser.id;

      this.wpService.uploadMedia(slug, title, author, this.file)
        .pipe(
          switchMap(image => {
            this.formPost.get('featured_media').setValue(parseInt(image.id));
            return this.wpService.newPost(this.formPost.value);
          })
        ).subscribe(post => {
          this.postStored();
          this.deleteImage();
        })
    } else {
      this.wpService.newPost(this.formPost.value).subscribe(resp => {
        this.postStored();
        this.deleteImage();
      });
    }
  }

  /**Funcion que se ejecuta cuando el post se guarda con exito */
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

  /**Funcion para borrar la imagen */
  deleteImage() {
    this.file = undefined;
    this.photoSelected = undefined;
  }

 

}
