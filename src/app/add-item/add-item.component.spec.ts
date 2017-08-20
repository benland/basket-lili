import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { ItemsService } from '../items.service';
import { ShufersalService } from '../shufersal.service';
import { AddItemComponent } from './add-item.component';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;
  let shufersalMock: any;

  beforeEach(async(() => {
    shufersalMock = {
      query: jasmine.createSpy('query')
    };
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: ShufersalService, useValue: shufersalMock },
        { provide: ItemsService, useValue: {} },
      ],
      declarations: [AddItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show a loading indicator once user typed a value', () => {
    const mockSubject = new Subject();
    shufersalMock.query.and.returnValue(mockSubject);
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.focus();
    input.value = 'Test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('md-icon.spin'))).toBeTruthy();
  });
});
