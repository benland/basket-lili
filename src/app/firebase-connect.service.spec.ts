import { TestBed, inject } from '@angular/core/testing';

import { FirebaseConnectService } from './firebase-connect.service';

describe('FirebaseConnectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseConnectService]
    });
  });

  it('should be created', inject([FirebaseConnectService], (service: FirebaseConnectService) => {
    expect(service).toBeTruthy();
  }));
});
