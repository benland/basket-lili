import { FirebaseConnectService } from './firebase-connect.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

export class Item {
  name: string;
  image: string;
  votes: {
    [key: string]: string;
  }
}

@Injectable()
export class ItemsService {
  items: Observable<Item[]>;

  constructor(firebaseConnect: FirebaseConnectService) {
    this.items = firebaseConnect
      .observe<{ [key: string]: Item }>(firebase.database().ref('/items'))
      .map(items => Object.keys(items).map(key => items[key]));
  }
}
