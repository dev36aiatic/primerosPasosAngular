import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
  }



  toggleBtn(btnBurger) {

    let sidebar = document.querySelector(".sidebar");
    let decision = sidebar.classList.toggle('active');
    let texts = document.querySelectorAll('.links_name');
    let tooltips = document.querySelectorAll('.tooltip');

    if (decision) {

      btnBurger.style.left = "90%";
      texts.forEach( element =>{
        element.classList.add('mostrarLinks')
      });

      tooltips.forEach( element => {
        element.classList.add('ocultarTooltip');
      });
      
    } else {
      btnBurger.style.left = "55%";
      texts.forEach( element =>{
        element.classList.remove('mostrarLinks')
      });

      tooltips.forEach( element => {
        element.classList.remove('ocultarTooltip');
      });
    }


  }
}
