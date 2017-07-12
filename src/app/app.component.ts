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
  title = 'Basket Lili';
  items: Observable<Item[]>;
  user: string;

  constructor(firebaseConnect: FirebaseConnectService, itemsService: ItemsService) {
    firebaseConnect.authenticate().then(user => {
      this.user = user;
      this.items = itemsService.items;
    });
  }
}
