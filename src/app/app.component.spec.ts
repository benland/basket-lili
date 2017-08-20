import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { FirebaseConnectService } from './firebase-connect.service';
import { ItemsService, Item } from './items.service';
import { ShufersalService } from './shufersal.service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: FirebaseConnectService, useValue: {
          authenticate: jest.fn().mockReturnValue(Promise.resolve({}))
        } },
        { provide: ItemsService, useValue: {} },
        { provide: ShufersalService, useValue: {} },
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  }));

  it('should authenticate the user', inject([ItemsService, FirebaseConnectService], (itemsService, firebaseConnect) => {
    itemsService.items = Observable.from([]);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(firebaseConnect.authenticate).toHaveBeenCalledWith();
  }));
});
