import { ShufersalService } from './shufersal.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseConnectService } from './firebase-connect.service';
import { ItemsService, Item } from './items.service';

enum SortType {
  name,
  time,
  votes,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<Item[]>;
  user: string;
  _sort = SortType.time;
  SortType = SortType;

  constructor(firebaseConnect: FirebaseConnectService, private itemsService: ItemsService,
    shufersal: ShufersalService) {
    firebaseConnect.authenticate().then(user => {
      this.user = user;
      this.updateItems();
    });
  }

  get sort() {
    return this._sort;
  }

  set sort(value: SortType) {
    this._sort = value;
    this.updateItems();
  }

  updateItems() {
      const sortFn = (left: Item, right: Item) => {
        switch (this.sort) {
          case SortType.votes:
            return (right.voteCount || 0) - (left.voteCount || 0);

          case SortType.time:
            return (right.addedDate || 0) - (left.addedDate || 0)

          case SortType.name:
            return ('' || left.title).localeCompare('' || right.title);
        }
      }

      this.items = this.itemsService.items
        .map(items => items.sort(sortFn));
  }

  trackItem(item: Item) {
    return item._id;
  }
}
