import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

interface IShufersalProductResult {
  Url: string;
  Id: string;
  Alt: string;
  IsNF: boolean;
}

export interface IShufersalProduct {
  title: string;
  image: string;
  id: string;
}

@Injectable()
export class ShufersalService {

  constructor(private http: Http) { }

  query(productName: string): Observable<IShufersalProduct[]> {
    return this.http
      .get(`https://crossorigin.me/http://www.shufersal.co.il/_layouts/Shufersal_Pages/AutoComplete.aspx?searchText=${encodeURIComponent(productName)}`)
      .map(response => JSON.parse(/var imgToLoad = (.+)/.exec(response.text())[1]) as IShufersalProductResult[])
      .map(resultSet =>
        resultSet.map(product => ({
          title: product.Alt,
          image: `http://www.shufersal.co.il/_layouts/images/Shufersal/Images/Products_Large/z_${product.Id}.PNG`,
          id: product.Id,
        }))
      );
  }
}
