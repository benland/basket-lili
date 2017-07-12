import { FirebaseConnectService } from './firebase-connect.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

export class Item {
  _id: string;
  title: string;
  image: string;
  voted?: boolean;
  voteCount?: number;
  votes?: {
    [key: string]: string;
  };
  basic?: boolean;
}

@Injectable()
export class ItemsService {
  items: Observable<Item[]>;

  private ref: firebase.database.Reference;

  constructor(private firebaseConnect: FirebaseConnectService) {
    this.ref = firebase.database().ref('/items');

    function countVotes(item: Item) {
      if (!item.votes) {
        return 0;
      }
      return Object.keys(item.votes).map(k => item.votes[k]).filter(k => k).length;
    }

    this.items = firebaseConnect
      .observe<{ [key: string]: Item }>(this.ref)
      .map(items => Object.keys(items).map(key => Object.assign({
        _id: key,
        voted: !!(items[key].votes || {})[this.firebaseConnect.uid],
        voteCount: countVotes(items[key]),
      }, items[key])));
  }

  upvote(item: Item, value: number = 1) {
    const { uid } = this.firebaseConnect;
    this.ref.child(item._id).child('votes').child(uid).set(value);
  }

  toggleVote(item: Item) {
    this.upvote(item, item.voted ? 0 : 1);
  }
}
