import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Item {
  name: string;
  image: string;
  votes: {
    [key: string]: string;
  }
}

const config = {
  apiKey: "AIzaSyB9SOn3EH7HDf0DNtgYLbEub5jCwlEqi1Y",
  authDomain: "basket-lili.firebaseapp.com",
  databaseURL: "https://basket-lili.firebaseio.com",
  projectId: "basket-lili",
  storageBucket: "basket-lili.appspot.com",
  messagingSenderId: "712621219605"
};

@Injectable()
export class ItemsService {
  items: Observable<Item[]>;

  constructor() {
    firebase.initializeApp(config);
    this.items = this
      .observe<{[key: string]: Item}>(firebase.database().ref('/items'))
      .map(items => Object.keys(items).map(key => items[key]));
  }

  observe<T>(ref: firebase.database.Reference) {
    return new Observable<T>(observer => {
      const watcher = ref.on('value', snap => {
        observer.next(snap.val());
      });
      return () => ref.off('value', watcher);
    });
  }
}
