import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ItemsService, Item } from './items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Basket Lili';
  items: Observable<Item[]>;

  constructor(itemsService: ItemsService) {
    this.items = itemsService.items;
    this.items.subscribe(console.log);
  }
}
