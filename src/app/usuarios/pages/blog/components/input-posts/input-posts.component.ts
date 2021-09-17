import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input-posts',
  templateUrl: './input-posts.component.html',
  styleUrls: ['./input-posts.component.css']
})
export class InputPostsComponent implements OnInit {

  @Output() onKeyUp:EventEmitter<string> = new EventEmitter();
  debouncer: Subject<string> = new Subject();
  constructor() { }

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(query =>{
      this.onKeyUp.emit(query);
    });
  }

  searchPost(query:string){
    this.debouncer.next(query);
  }
}
