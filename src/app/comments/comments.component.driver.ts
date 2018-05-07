import { By } from '@angular/platform-browser';
import { CommentsComponent } from './comments.component';
import { ComponentFixture } from '@angular/core/testing';

export class CommentsComponentDriver {
    constructor(private fixture: ComponentFixture<CommentsComponent>) {
    }

    getComments() {
        return this.fixture.debugElement.queryAll(By.css('.comment-item'))
            .map(e => e.nativeElement.textContent.trim());
    }

    typeText(value: string) {
        const input = this.fixture.debugElement.query(By.css('input')).nativeElement;
        input.focus();
        input.value = value;
        input.dispatchEvent(new Event('input'));
    }

    clickSendButton() {
        this.fixture.debugElement.query(By.css('.add-comment mat-icon')).nativeElement.click();
    }
}
