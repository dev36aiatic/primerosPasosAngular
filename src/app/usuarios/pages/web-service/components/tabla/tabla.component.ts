import { Component, Input, OnInit } from '@angular/core';
import { WebServiceResponse } from '../../interfaces/web-service.interface';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: [
  ]
})
export class TablaComponent implements OnInit {

  @Input() options: WebServiceResponse[] = [];
  @Input() title: string = '';
  constructor() { }

  ngOnInit(): void {
  }


 
}
