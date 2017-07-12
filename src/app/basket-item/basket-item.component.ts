import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent {
  constructor(private itemsService: ItemsService) {
  }
  @Input()
  item;

  toggle() {
    this.itemsService.toggleVote(this.item);
  }
}
