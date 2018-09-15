import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgSimpleEditorModule } from 'ng-simple-editor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgSimpleEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
