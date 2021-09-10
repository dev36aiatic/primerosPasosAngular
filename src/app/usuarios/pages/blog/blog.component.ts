import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts!: any;
  constructor(private wpService:WordpressService ) { }

  ngOnInit(): void {
    this.wpService.getAll(20).subscribe(posts => this.posts = posts,
      (error) => {
        console.log(error);
      });
  }

}
