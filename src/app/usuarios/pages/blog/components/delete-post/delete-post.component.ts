import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  @Input() post:Post;
  @Output() onSendPostId: EventEmitter<number> = new EventEmitter();
  postToDelete: number;

  constructor() { }

  ngOnInit(): void {
  }

  /**Funcion que se emite el id del post a borrar */
  deleteThisPost(id:number){
    this.onSendPostId.emit(id);
  }

}
