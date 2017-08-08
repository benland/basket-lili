import { Component, Input, OnInit } from '@angular/core';
import { ItemsService, Item, Comment } from '../items.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() item: Item;

  newCommentText: string;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
  }

  get comments() {
    if (!this.item.comments) {
      return [];
    }
    return Object.keys(this.item.comments).map(k =>
        Object.assign({
          _id: k,
          userInfo: this.itemsService.userInfo(this.item.comments[k].user)
        }, this.item.comments[k]));
  }

  trackFn(comment: Comment) {
    return comment._id;
  }

  addComment() {
    this.itemsService.addComment(this.item, this.newCommentText);
    this.newCommentText = '';
  }
}
