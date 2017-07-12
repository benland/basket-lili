import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { FirebaseConnectService } from './firebase-connect.service';
import { AppComponent } from './app.component';
import { ItemsService } from './items.service';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [
    FirebaseConnectService,
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
