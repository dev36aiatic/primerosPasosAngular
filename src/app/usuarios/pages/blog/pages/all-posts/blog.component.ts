import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Post } from '../../interfaces/post.interface';
import { WordpressUser } from '../../interfaces/logged-wp-user.interface';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts!: Post[];
  filterPosts!: Post[];
  isLoading: boolean = undefined;
  wpUser: WordpressUser;
  isWPLogged: boolean;

  constructor(private wpService: WordpressService) { }

  ngOnInit(): void {
    //Valida si el usuario inicio sesion
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

    this.wpService.getAll(50).subscribe(posts => {
      this.posts = posts;
      this.filterPosts = posts;
    },
      (error) => {
        console.log(error);
      });
  }

  /**
   * Función para borrar un post
   * @param id - id del post a borrar
   */
  postToDelete(id: number) {
    this.wpService.deleteSinglePost(id)
      .pipe(
        switchMap(post => {
          if (post["error"]) {
            Swal.fire('Error', post["error"]["message"], 'error');
            return;
          } else {
            return this.wpService.getAll(50);
          }
        })
      ).subscribe(posts => {
        Swal.fire('Y ser marchó ♫ 𝄞 🎶', 'La entrada ha sido borrada.', 'success');
        this.posts = posts;
        this.filterPosts = posts;
      })
  }
  /**
   * Funcion que busca posts que tengan contenido relacionado al parametro query
   * @param query - Termino de busqueda
   */
  searchPost(query: string) {
    query = query.toLowerCase().trim();

    this.posts = this.filterPosts.filter(post => {
      return post.title.rendered.toLowerCase().includes(query) ||
        post['_embedded']['author']['0'].name.toLowerCase().includes(query) ||
        post.excerpt.rendered.toLowerCase().includes(query)
    });
  }

  /**
   * Funcion hija del componente app-menu-wp la cual avisa cuando informacion relacionada con el usuario
   * termina de cargarse
   * @param loading - booleano true si esta cargando false si ya cargó
   */
  onLoading(loading: boolean) {
    this.isLoading = loading;
  }


}
