import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent implements OnInit {
  constructor() {
  }

  @Input()
  item;

  ngOnInit() {
  }

}
