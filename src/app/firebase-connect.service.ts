import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB9SOn3EH7HDf0DNtgYLbEub5jCwlEqi1Y',
  authDomain: 'basket-lili.firebaseapp.com',
  databaseURL: 'https://basket-lili.firebaseio.com',
  projectId: 'basket-lili',
  storageBucket: 'basket-lili.appspot.com',
  messagingSenderId: '712621219605'
};

@Injectable()
export class FirebaseConnectService {
  uid: string;
  email: string;

  constructor() {
    firebase.initializeApp(config);
  }

  observe<T>(ref: firebase.database.Reference) {
    return new Observable<T>(observer => {
      const watcher = ref.on('value', snap => {
        observer.next(snap.val());
      });
      return () => ref.off('value', watcher);
    });
  }

  async authenticate() {
    const result = await firebase.auth().getRedirectResult();
    const user = result.user || firebase.auth().currentUser;
    if (!user) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
    this.uid = user.uid;
    this.email = user.email;
    return user.email;
  }
}
