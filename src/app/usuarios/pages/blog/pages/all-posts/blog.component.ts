import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';
import { LoggedWpUser } from '../../interfaces/logged-wp-user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts!: any;
  isWPLogged: boolean = false;
  load: boolean = false;
  wpUser: LoggedWpUser;
  constructor(private wpService: WordpressService, private router: Router) { }

  ngOnInit(): void {
    this.isWPLogged = !!localStorage.getItem('wp-token');

    if (this.isWPLogged) {
      this.wpService.getWPUser().subscribe(user => {
          this.wpUser = user;
      });
    }

    this.wpService.getAll(50).subscribe(posts => this.posts = posts,
      (error) => {
        console.log(error);
      });
  }

  addPost() {
    if (this.isWPLogged) {
      this.load = true;
      this.router.navigateByUrl('dashboard/blog/añadir-post');
    } else {
      this.load = false;
      this.router.navigateByUrl('dashboard/blog/iniciar-sesion-wp');
    }
  }

}
