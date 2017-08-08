import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ItemsService, Item, User } from '../items.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnChanges {
  @Input() item: Item;

  voters: Observable<User[]>
  voterNames: Observable<string>;

  commentsVisible: boolean;

  constructor(private itemsService: ItemsService) {
  }

  ngOnChanges() {
    if (this.item) {
      this.voters = this.itemsService.votes(this.item)
        .map(voters => voters.slice(0, 3))
      this.voterNames = this.itemsService.votes(this.item)
        .map(voters => voters.map(user => user.name).join(', '));
    } else {
      this.voters = null;
    }
  }

  toggle() {
    this.itemsService.toggleVote(this.item);
  }

  showComments() {
    this.commentsVisible = !this.commentsVisible;
  }

  userId(user: User) {
    return user._id;
  }
}
