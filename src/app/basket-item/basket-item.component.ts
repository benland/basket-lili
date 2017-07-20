import { Component, Input, OnInit } from '@angular/core';
import { ItemsService, Item } from '../items.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent {
  @Input() item: Item;

  constructor(private itemsService: ItemsService) {
  }

  toggle() {
    this.itemsService.toggleVote(this.item);
  }
}
