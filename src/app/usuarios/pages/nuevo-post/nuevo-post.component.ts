import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { LoggedWpUser } from '../../interfaces/logged-wp-user.interface';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css']
})
export class NuevoPostComponent implements OnInit {

  loggedUser!: LoggedWpUser;
  authors: object[];
  status: object[];
  uploadedFiles: any[] = [];
  categories: any[] = [{ name: 'Art', id: 16 }, { name: 'Mouses', id: 16 }, { name: 'Tvs', id: 16 },{ name: 'Art', id: 16 }, { name: 'Mouses', id: 16 }, { name: 'Tvs', id: 16 }, { name: 'Bussiness', id: 16 },{ name: 'Thinkinng', id: 16 }];
  selectedCategories: any[] = [];
  loading = false;


  constructor(private wpService: WordpressService) { }

  ngOnInit(): void {
    this.wpService.getWPUser().subscribe(wpUser => this.loggedUser = wpUser);
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

  newPost(){
    this.loading = true;
  }

  load(){
    this.loading = true;
  }

}
