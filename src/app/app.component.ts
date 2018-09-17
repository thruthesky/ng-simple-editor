import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { NgSimpleEditorComponent } from 'projects/ng-simple-editor/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'ng-simple-editor-app';
  content;

  @ViewChild('editor') editor: NgSimpleEditorComponent;

  ngAfterContentInit() {
    this.editor.putContent(`<h1>Let's Edit!</h1>`);
  }

  onChange(content: string) {
    this.content = content;
  }
}
