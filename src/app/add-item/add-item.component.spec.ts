import { AddItemComponentDriver } from './add-item.component.driver';
import { Observable } from 'rxjs/Rx';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { ItemsService } from '../items.service';
import { ShufersalService, IShufersalProduct } from '../shufersal.service';
import { AddItemComponent } from './add-item.component';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let driver: AddItemComponentDriver;
  let shufersalMock: any;
  let itemsMock: any;

  beforeEach(async(() => {
    shufersalMock = {
      query: jasmine.createSpy('query')
    };
    itemsMock = {
      createItem: jasmine.createSpy('createItem')
    };
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: ShufersalService, useValue: shufersalMock },
        { provide: ItemsService, useValue: itemsMock },
      ],
      declarations: [AddItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    driver = new AddItemComponentDriver(fixture);
  });

  it('should show a loading indicator once user typed a value', () => {
    const mockSubject = new Subject<IShufersalProduct[]>();
    shufersalMock.query.and.returnValue(mockSubject);
    driver.typeText('Test');
    fixture.detectChanges();
    expect(driver.loadingIndicatorVisible()).toBe(true);
  });

  it('should display results received from server', () => {
    shufersalMock.query.and.returnValue(Observable.of([{
      id: '1235',
      title: 'Testing product',
      image: null,
    }]));
    driver.typeText('Test');
    expect(shufersalMock.query).toHaveBeenCalledWith('Test');
    fixture.detectChanges();
    expect(driver.loadingIndicatorVisible()).toBe(false);
    expect(driver.getItems()).toEqual(['Testing product']);
  });

  it('should add an item once you click on it', () => {
    shufersalMock.query.and.returnValue(Observable.of([{
      id: '1234',
      title: 'Basket Test',
      image: null,
    }]));
    driver.typeText('Test');
    fixture.detectChanges();
    driver.clickItem(0);
    expect(itemsMock.createItem).toHaveBeenCalledWith('1234', 'Basket Test', null);
  });

  it('should clear the text box after adding an item', fakeAsync(() => {
    shufersalMock.query.and.returnValue(Observable.of([{
      id: '1234',
      title: 'Basket Test',
      image: null,
    }]));
    driver.typeText('Test');
    expect(driver.getInputText()).toBe('Test');
    fixture.detectChanges();
    driver.clickItem(0);
    tick();
    expect(driver.getInputText()).toBe('');
  }));
});
