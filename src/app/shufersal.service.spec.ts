import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ShufersalService } from './shufersal.service';

describe('ShufersalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        ShufersalService
      ]
    });
  });

  it('should be created', inject([ShufersalService], (service: ShufersalService) => {
    expect(service).toBeTruthy();
  }));
});
