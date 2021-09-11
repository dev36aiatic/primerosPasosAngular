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

  loggedUser!:LoggedWpUser;
  authors: object[];

  constructor(private wpService: WordpressService) { }

  ngOnInit(): void {

    this.wpService.getWPUser().subscribe(wpUser => this.loggedUser = wpUser);

    this.authors = [
      {
        name: 'Lynross',
        id:1
      }
    ]


  }

}
