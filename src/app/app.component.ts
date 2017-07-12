import { ShufersalService } from './shufersal.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseConnectService } from './firebase-connect.service';
import { ItemsService, Item } from './items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<Item[]>;
  user: string;

  constructor(firebaseConnect: FirebaseConnectService, itemsService: ItemsService,
    shufersal: ShufersalService) {
    firebaseConnect.authenticate().then(user => {
      this.user = user;
      this.items = itemsService.items
        .map(items => items.sort((left, right) => (right.addedDate || 0) - (left.addedDate || 0)));
    });
  }

  trackItem(item: Item) {
    return item._id;
  }
}
