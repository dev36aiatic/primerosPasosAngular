import { Component, Input, OnInit } from '@angular/core';

import { WebServiceResponse } from '../../interfaces/web-service.interface';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: [
  ]
})
export class TablaComponent implements OnInit {

  /**Titulo y array de departamentos o municipios de colombia enviados por la api */
  @Input() options: WebServiceResponse[] = [];
  @Input() title: string = '';
  constructor() { }

  ngOnInit(): void {
  }
}
