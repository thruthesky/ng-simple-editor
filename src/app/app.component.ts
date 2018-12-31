import { Component, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { NgSimpleEditorComponent } from 'projects/ng-simple-editor/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {
  @ViewChild('editor') editor: NgSimpleEditorComponent;
  content: string;
  twoway = '<h1>Twoway binding</h1>';
  constructor() {

  }

  ngOnInit() {
      setTimeout(() => this.twoway = '<h1>Twoway Binding Test</h1>', 5000);
  }

  ngAfterContentInit() {
    this.editor.putContent(`<h1>Let's Edit!</h1>`);
  }

  onChange(event: Event) {
    this.content = this.editor.content;
  }
}
