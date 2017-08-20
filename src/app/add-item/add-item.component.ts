import { Component, OnInit } from '@angular/core';
import { IShufersalProduct, ShufersalService } from '../shufersal.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';
import { ItemsService } from '../items.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  filteredOptions: Observable<IShufersalProduct[]>;
  myControl = new FormControl();
  loading = false;

  private pendingRequests = 0;

  constructor(private shufersalService: ShufersalService,
  private itemsService: ItemsService) {
  }

  ngOnInit() {
    this.filteredOptions =
      this.myControl.valueChanges
        .switchMap(name => this.filter(name));
  }

  filter(name: string): Observable<IShufersalProduct[]> {
    this.loading = true;
    this.pendingRequests++;
    return this.shufersalService.query(name).finally(() => {
      this.pendingRequests--;
      this.loading = this.pendingRequests > 0;
    });
  }

  add(item: IShufersalProduct) {
    this.itemsService.createItem(item.id, item.title, item.image);
    this.myControl.patchValue('');
  }
}
