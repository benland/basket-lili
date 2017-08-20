import { FirebaseConnectService } from './firebase-connect.service';
import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import * as firebase from 'firebase';

import { ItemsService } from './items.service';

describe('ItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseConnectService, useValue: {
          observe: jest.fn().mockReturnValue(Observable.from([]))
        } },
        ItemsService
      ]
    });
  });

  it('should be created', inject([FirebaseConnectService, ItemsService], (firebaseConnect, service: ItemsService) => {
    expect(service).toBeTruthy();
  }));
});
