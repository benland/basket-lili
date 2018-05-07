import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AddItemComponent } from './add-item.component';

export class AddItemComponentDriver {
    constructor(private fixture: ComponentFixture<AddItemComponent>) {
    }

    typeText(value: string) {
        const input = this.fixture.debugElement.query(By.css('input')).nativeElement;
        input.focus();
        input.value = value;
        input.dispatchEvent(new Event('input'));
    }

    getInputText() {
        const input = this.fixture.debugElement.query(By.css('input')).nativeElement;
        return input.value;
    }

    loadingIndicatorVisible() {
        return this.fixture.debugElement.query(By.css('mat-icon.spin')) !== null;
    }

    private getItemElements() {
        return this.fixture.debugElement.queryAll(By.css('mat-option'));
    }

    getItems() {
        return this.getItemElements()
            .map(item => item.nativeElement.textContent.trim());
    }

    clickItem(index: number) {
        const item = this.getItemElements()[index].nativeElement;
        item.dispatchEvent(new Event('click'));
    }
}
