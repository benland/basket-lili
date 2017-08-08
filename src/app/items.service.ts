import { FirebaseConnectService } from './firebase-connect.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

export class Comment {
  _id?: string;
  user: string;
  text: string;
  time: number;
}

export class Item {
  _id: string;
  title: string;
  image: string;
  voted?: boolean;
  addedDate: number;
  addedBy: string;
  voteCount?: number;
  votes?: {
    [key: string]: string;
  };
  commentCount?: number;
  comments?: {
    [key: string]: Comment;
  }
  basic?: boolean;
}

export class User {
  _id: string;
  photo: string;
  name: string;
}

export class UsersMap {
  [key: string]: User;
}

@Injectable()
export class ItemsService {
  items: Observable<Item[]>;

  private ref: firebase.database.Reference;
  private usersRef: firebase.database.Reference;

  constructor(private firebaseConnect: FirebaseConnectService) {
    this.ref = firebase.database().ref('/items');
    this.usersRef = firebaseConnect.usersRef;

    function countVotes(item: Item) {
      if (!item.votes) {
        return 0;
      }
      return Object.keys(item.votes).map(k => item.votes[k]).filter(k => k).length;
    }

    function countComments(item: Item) {
      return item.comments ? Object.keys(item.comments).length : 0;
    }

    this.items = firebaseConnect
      .observe<{ [key: string]: Item }>(this.ref)
      .map(items => Object.keys(items).map(key => Object.assign({
        _id: key,
        voted: !!(items[key].votes || {})[this.firebaseConnect.uid],
        voteCount: countVotes(items[key]),
        commentCount: countComments(items[key]),
      }, items[key])))
      .map(items => items.filter(item => item.voteCount));
  }

  upvote(item: Item, value: number = 1) {
    const { uid } = this.firebaseConnect;
    this.ref.child(item._id).child('votes').child(uid).set(value);
  }

  toggleVote(item: Item) {
    this.upvote(item, item.voted ? 0 : 1);
  }

  async createItem(id: string, title: string, image: string) {
    const { uid, email } = this.firebaseConnect;
    const targetRef = this.ref.child(id);

    const exists = await targetRef.once('value').then(snap => snap.val());
    if (exists) {
      targetRef.child('votes').child(uid).set(1);
      return;
    }

    await targetRef.set({
      title,
      image,
      votes: {
        [uid]: 1
      },
      addedDate: firebase.database.ServerValue.TIMESTAMP,
      addedBy: email,
    });
  }

  votes(item: Item) {
    const sortFn = (left: User, right: User) => {
      // Makes sure the current user always appears last
      if (left._id === this.firebaseConnect.uid) {
        return 1;
      }
      if (right._id === this.firebaseConnect.uid) {
        return -1;
      }
      return 0;
    }

    const voteUsers = Object.keys(item.votes || {}).filter(key => item.votes[key]);
    return this.firebaseConnect.observe<UsersMap>(this.usersRef)
      .map(users => {
        if (!users) {
          return [];
        }
        return Object.keys(users)
          .filter(key => voteUsers.includes(key))
          .map(key => Object.assign({}, users[key], {_id: key}))
          .sort(sortFn);
      });
  }

  addComment(item: Item, text: string) {
    const { uid } = this.firebaseConnect;
    this.ref.child(item._id).child('comments').push({
      text,
      user: uid,
      time: firebase.database.ServerValue.TIMESTAMP,
    });
  }

  userInfo(userId: string) {
    return this.firebaseConnect.observe<User>(this.usersRef.child(userId));
  }
}
