import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles:[
   `
   .pattern{
     position:fixed;
     top:0;
     left:0;
     width:100%;
     height:100%;
     background: url('../../../../assets/pattern.jpg');
     background-repeat: repeat-y;
     background-size: cover;
     background-attachment: fixed;
     overflow-y: scroll;
   }
   `
  ]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
