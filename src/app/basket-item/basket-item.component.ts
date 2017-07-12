import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from './../items.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent {
  constructor(private itemsService: ItemsService) {
  }
  @Input() item: Item;

  toggle() {
    this.itemsService.toggleVote(this.item);
  }
}
