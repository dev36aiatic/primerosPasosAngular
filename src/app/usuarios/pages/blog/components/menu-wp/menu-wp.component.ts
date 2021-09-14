import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedWpUser } from '../../interfaces/logged-wp-user.interface';
import { WordpressService } from '../../services/wordpress.service';

@Component({
  selector: 'app-menu-wp',
  templateUrl: './menu-wp.component.html',
  styleUrls: ['./menu-wp.component.css']
})
export class MenuWpComponent implements OnInit {

  @Input() wpUser: LoggedWpUser;
  constructor(private wpService: WordpressService, private router: Router) { }

  ngOnInit(): void {
  }
  signoutWP() {
    this.wpService.wpLogout();
    this.router.navigateByUrl('dashboard/blog');
    if (this.router.url == '/dashboard/blog') {
      window.location.reload();
    }
  }
}
