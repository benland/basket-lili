import { Component, OnInit } from '@angular/core';
import { IShufersalProduct, ShufersalService } from '../shufersal.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/mergeMap';
import { ItemsService } from '../items.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  filteredOptions;
  myControl = new FormControl();

  constructor(private shufersalService: ShufersalService,
  private itemsService: ItemsService) {
  }

  ngOnInit() {
    this.filteredOptions =
      this.myControl.valueChanges
        .mergeMap(name => this.filter(name));
  }

  filter(name: string): Observable<IShufersalProduct[]> {
    return this.shufersalService.query(name);
  }

  add(item: IShufersalProduct) {
    this.itemsService.createItem(item.id, item.title, item.image);

  }

}
