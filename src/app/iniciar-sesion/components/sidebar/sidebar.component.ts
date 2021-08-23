import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
    h3 {
      border-bottom: 1px solid #ffffff40;
      padding-bottom:10px;
    }
    ul {
      list-style:none;
      margin-top:30px;
    }
    ul li {
      display: block;
      margin: 10px 0px;
      padding: 10px;
      cursor: pointer;
      transition: all ease .3s;
    }
    ul li a i { 
      display: inline-block;
      margin-right: 10px;
    }

    ul li:hover{
      background: #000;
      transition: all ease .3s;
    }
    `
  ]
})
export class SidebarComponent implements OnInit {

  visibleSidebar1;
  title = 'Menu'
  constructor() { }

  ngOnInit(): void {
  }

}
