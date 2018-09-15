# Angular Simple Editor

## Why

* I search Angular editors and I couldn't find simple one. All of them has dependencies like jQury, Bootstrap, Fontawesome.
* So I made one for myself. Deadly simple yet, extendible. No dependencies.

## Install

```` sh
npm install --save ng-simple-editor
````

## Usage

### How to set up

* And add `NgSimpleEditorModule` to AppModule or any where.

```` typescript
import { NgSimpleEditorModule } from 'ng-simple-editor';
@NgModule({
  ...
  imports: [
    NgSimpleEditorModule
  ],
  ...
})
export class AppModule { }
````

### How use it in template

* Use in template like below.

```` html
<ng-simple-editor #editor></ng-simple-editor>
content: {{ editor.content }}
````

* Add buttons.
  * By default, if [buttons] is omitted, then it shows all the possible butttons.
  * You can add indivisual buttons.

```` html
  <ng-simple-editor #editor
    [buttons]="['bold', 'italic', 'underline', 'fontsize', 'forecolor', 'backcolor', 'highlight', 'link', 'unink', 'table', 'formatblock', 'insertline', 'insertimage', 'orderedlist', 'unorderedlist', 'left', 'center', 'removeformat', 'strike', 'big', 'normal']"
  ></ng-simple-editor>
  content: {{ editor.content }}
````

* And put/get HTML into the editor.

```` typescript
  @ViewChild('editor') editor: NgSimpleEditorComponent;
  ngAfterContentInit() {
    this.editor.putContent(`<h1>Let's Edit!</h1>`);
  }
  /**
   * Get the HTML of editor
   */
  const html = this.editorComponent.getContent();
````

* There is another handy way to insert HTML into editor.
  When the component is created dynamically using `*ngIf=" ... "`, it is not easy to know when `@ViewChild() editor: EditComponet;` is ready to use `editor.putContent()`. It often causes `calling putContent() of undefined`. In this case you can use `[init]` property to insert the default HTML content into editor.

```` html
<ng-simple-editor #editor *ngIf=" mode != 'fake' "
  [init]=" { content: comment.content_original }"
  [buttons]="['bold', 'italic', 'unerline', 'fontsize', 'forecolor', 'backcolor', 'highlight', 'link', 'unink', 'table', 'formatblock', 'insertline', 'insertimage', 'orderedlist', 'unorderedlist', 'left', 'center', 'removeformat', 'strike', 'big', 'normal']"
></ng-simple-editor>
````

* How to set cursor.
  For post writing, you will need to put cursor on subject input tag.
  For comment write/edit, you will need to put cursor on editor.

```` html
      <ng-simple-editor #editorComponent *ngIf=" mode != 'fake' "
        [init]=" { content: comment?.content_original, cursor: true }"
        [buttons]="['bold', ..., 'normal']"
      ></ng-simple-editor>
````

## Buttons

* Buttons on editor appears in the order as they were given by [buttons] @Input() property.
