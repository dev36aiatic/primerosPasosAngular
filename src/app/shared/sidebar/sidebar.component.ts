import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../iniciar-sesion/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router, private authservice:AuthService) { 
  }

  ngOnInit(): void {
  }


  logout(){
    this.authservice.logout();
    this.router.navigateByUrl('/auth');
  }

  toggleBtn(btnBurger) {

    let sidebar = document.querySelector(".sidebar");
    let decision = sidebar.classList.toggle('active');
    let texts = document.querySelectorAll('.links_name');
    let tooltips = document.querySelectorAll('.tooltip');

    if (decision) {

      btnBurger.style.left = "90%";
      texts.forEach( element =>{
        element.classList.add('showLinks')
      });

      tooltips.forEach( element => {
        element.classList.add('hideTooltip');
      });
      
    } else {
      btnBurger.style.left = "55%";
      texts.forEach( element =>{
        element.classList.remove('showLinks')
      });

      tooltips.forEach( element => {
        element.classList.remove('hideTooltip');
      });
    }


  }
}
