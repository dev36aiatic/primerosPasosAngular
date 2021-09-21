import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { WordpressService } from '../../services/wordpress.service';
import { WordpressUser } from '../../interfaces/logged-wp-user.interface';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  slug: string;
  post: any;
  wpUser!: WordpressUser;
  isWPLogged: boolean;

  constructor(private wpService: WordpressService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Toma el slug de la url y busca el post en la api de wp
    this.route.params.pipe(
      switchMap(({ slug }) => {
        this.slug = slug
        return this.wpService.getSinglePost(slug)
      })
    ).subscribe(post => this.post = post, (error) => console.log(error));

    if (localStorage.getItem('wp-token')) {
      this.wpService.getWPUser().subscribe(user => {
        if (user["error"]) {
          this.isWPLogged = false;
          this.wpService.wpLogout();
        } else {
          this.wpUser = user;
          this.isWPLogged = true;
        }
      });
    } else {
      this.isWPLogged = false;
    }
  }
}
