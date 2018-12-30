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
  html = '<h1>Two way binding</h1><p><b>Bold</b></p>Normal text';

  @ViewChild('editor') editor: NgSimpleEditorComponent;

  ngAfterContentInit() {
    this.editor.putContent(`<h1>Let's Edit!</h1>`);
  }

  onChange(event: Event) {
    this.content = this.editor.content;
  }
}
