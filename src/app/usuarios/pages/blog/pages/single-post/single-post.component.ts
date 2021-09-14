import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  slug: string;
  post: any;

  constructor(private wpService: WordpressService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ slug }) => {
        this.slug = slug
        return this.wpService.getSinglePost(slug)
      })
    ).subscribe(post => this.post = post, (error) => console.log(error));
  }

}
