import { TestBed, inject } from '@angular/core/testing';

import { ShufersalService } from './shufersal.service';

describe('ShufersalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShufersalService]
    });
  });

  it('should be created', inject([ShufersalService], (service: ShufersalService) => {
    expect(service).toBeTruthy();
  }));
});
