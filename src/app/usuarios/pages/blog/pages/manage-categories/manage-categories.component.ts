import { Component, OnInit } from '@angular/core';
import { WordpressUser } from '../../interfaces/logged-wp-user.interface';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  wpUser!: WordpressUser;
  isWPLogged: boolean;

  constructor(private wpService:WordpressService) { }

  ngOnInit(): void {

    this.wpService.getWPUser().subscribe(user => {
      if (user["error"]) {
        this.isWPLogged = false;
        this.wpService.wpLogout();
      } else {
        this.wpUser = user;
        this.isWPLogged = true;
      }
    });
  }

}
