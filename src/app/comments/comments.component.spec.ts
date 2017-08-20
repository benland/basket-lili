import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ItemsService } from '../items.service';
import { CommentsComponent } from './comments.component';
import { CommentsComponentDriver } from './comments.component.driver';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let driver: CommentsComponentDriver;
  let itemsMock;

  beforeEach(async(() => {
    itemsMock = {
      userInfo: jasmine.createSpy('userInfo').and.returnValue(Promise.resolve({photo: null})),
      addComment: jasmine.createSpy('addComment'),
    };

    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, NoopAnimationsModule],
      providers: [
           { provide: ItemsService, useValue: itemsMock }
      ],
      declarations: [CommentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    driver = new CommentsComponentDriver(fixture);
  });

  it('should display list of all comments', () => {
    component.item = {
      _id: '123',
      title: 'foo',
      image: null,
      addedDate: null,
      addedBy: null,
      comments: {
        test: {
          user: 'Uri',
          text: 'Hello, World!',
          time: 1503230059078
        }
      },
    };
    fixture.detectChanges();
    expect(driver.getComments()).toEqual(['Hello, World!']);
  });

  it('should add a new comment successfully', () => {
    component.item = {
      _id: '123',
      title: 'foo',
      image: null,
      addedDate: null,
      addedBy: null,
      comments: null,
    };
    fixture.detectChanges();
    driver.typeText('This is a new comment!');
    driver.clickSendButton();
    expect(itemsMock.addComment).toHaveBeenCalledWith({
      _id: '123',
      title: 'foo',
      image: null,
      addedDate: null,
      addedBy: null,
      comments: null,
    }, 'This is a new comment!');
  });
});
