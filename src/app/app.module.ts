import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NgSimpleEditorModule } from 'ng-simple-editor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSimpleEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
