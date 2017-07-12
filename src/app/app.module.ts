import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { FirebaseConnectService } from './firebase-connect.service';
import { ShufersalService } from './shufersal.service';
import { AppComponent } from './app.component';
import { ItemsService } from './items.service';

import 'hammerjs';
import { BasketItemComponent } from './basket-item/basket-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BasketItemComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpModule,
    BrowserAnimationsModule,
  ],
  providers: [
    FirebaseConnectService,
    ShufersalService,
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
