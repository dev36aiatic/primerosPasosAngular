import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styles: [
  ]
})
export class VideoComponent implements OnInit {

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  /**Funcion que recibe una URL de un video de youtube
   * @param { string } url  - URL video de youtube
   * @returns URL del video a incrustar
   */
  getVideoIframe(url:string) {
    let video, results;
    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];
    
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

}
