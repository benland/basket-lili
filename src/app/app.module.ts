import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule, MatInputModule, MatIconModule, MatAutocompleteModule, MatToolbarModule, MatSelectModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
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
import { HttpsLinkPipe } from './https-link.pipe';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    BasketItemComponent,
    AddItemComponent,
    HttpsLinkPipe,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
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
