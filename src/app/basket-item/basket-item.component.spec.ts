import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { HttpsLinkPipe } from '../https-link.pipe';
import { ItemsService } from '../items.service';
import { BasketItemComponent } from './basket-item.component';

describe('BasketItemComponent', () => {
  let component: BasketItemComponent;
  let fixture: ComponentFixture<BasketItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ItemsService, useValue: {} }
      ],
      declarations: [
        HttpsLinkPipe,
        BasketItemComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketItemComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    component.item = {
      _id: '123',
      title: 'foo',
      image: 'http://www.google.com/image.jpg',
      addedDate: null,
      addedBy: null,
      comments: null,
    }
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
