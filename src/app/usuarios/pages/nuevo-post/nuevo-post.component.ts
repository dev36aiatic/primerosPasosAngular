import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { LoggedWpUser } from '../../interfaces/logged-wp-user.interface';
import { WordpressService } from '../../services/wordpress.service';
import { WpCategory } from '../../interfaces/wp-category.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css']
})
export class NuevoPostComponent implements OnInit {

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
  uploadedFiles: any[] = [];
  categories: WpCategory[] = [];
  selectedCategories: any[] = [];
  loading = false;


  constructor(private formBuilder: FormBuilder, private wpService: WordpressService) { }

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

  newPost() {

    if (this.file != undefined) {
      const title = this.file.name.split('.')[0];
      const slug = this.file.name.split('.')[0];
      const author = this.loggedUser.id;

      this.wpService.uploadMedia(slug, title, author, this.file)
        .pipe(
          switchMap(image => {
            this.formPost.get('featured_media').setValue(parseInt(image.id));
            return this.wpService.newPost(this.formPost.value)
          })
        ).subscribe(post => {
          console.log(post, 'uwu')
          this.loading = false;
        })

    } else {
      this.wpService.newPost(this.formPost.value).subscribe(resp => {
        console.log(resp, 'uwu')
        this.loading = false;
      });
    }
    console.log(this.formPost.value, 'asd');
  }

  load() {
    this.loading = true;
  }

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

  deleteImage() {
    this.file = undefined;
    this.photoSelected = undefined;
  }

}
