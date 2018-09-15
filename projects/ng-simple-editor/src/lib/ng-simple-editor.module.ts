import { NgModule } from '@angular/core';
import { NgSimpleEditorComponent } from './ng-simple-editor.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgSimpleEditorComponent],
  exports: [NgSimpleEditorComponent]
})
export class NgSimpleEditorModule { }
