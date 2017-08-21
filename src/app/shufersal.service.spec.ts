import { TestBed, inject } from '@angular/core/testing';

import { ShufersalService } from './shufersal.service';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

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

  it('should parse shufersal API response correctly',
    inject([ShufersalService, XHRBackend], (service: ShufersalService, backend: MockBackend) => {
      const result = service.query('Test');
      /* tslint:disable max-line-length */
      backend.connectionsArray[0].mockRespond(new Response(new ResponseOptions({
        body: `
          var imgToLoad = [{"Url":"/_layouts/images/Shufersal/Images/Products_small/s_2826477.PNG","Id":"2826477","Alt":"שלגון בומבה","IsNF":false}]
        `
      })));
      let res: any = null;
      result.subscribe(response => res = response);
      expect(res).toEqual([{
        title: 'שלגון בומבה',
        image: 'http://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_2826477.PNG',
        id: '2826477'
      }]);
    }));
});
