import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-unab',
  templateUrl: './logo-unab.component.html',
  styles: [
    `
      .logo{
      position: absolute;
      z-index: 999999;
      left:20px;
      top:5px;
    }
    `
  ]
})
export class LogoUnabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
