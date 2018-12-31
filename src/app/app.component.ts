import { Component, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { NgSimpleEditorComponent } from 'projects/ng-simple-editor/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'ng-simple-editor-app';
  content: string;
  html: any = `<h1>Two binding test</h1>`;
  @ViewChild('editor') editor: NgSimpleEditorComponent;

  constructor() {

  }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => this.html = i, i * 1000);
    }
  }

  ngAfterContentInit() {
    this.editor.putContent(`<h1>Let's Edit!</h1>`);
  }

  onChange(event: Event) {
    this.content = this.editor.content;
  }
}
