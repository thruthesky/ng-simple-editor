# Angular Simple Editor

## Why

* I search Angular/Ionic Web editors and I couldn't find simple one. All of them have dependencies like jQury, Bootstrap, Fontawesome, etc.
* So I made one for myself. It's deadly simple. Easy to edit. No dependencies at all.

## Todo

* More design
* More documentation
* Better coding style

## How to Install

```` sh
npm install --save ng-simple-editor
````

## How to Use

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

### How to use it in template

* Very simple.

```` html
<ng-simple-editor #editor></ng-simple-editor>
content: {{ editor.content }}
````

* Add buttons.
  * By default, if [buttons] is omitted, then it shows all the possible butttons.
  * You can add indivisual buttons. Order of buttons matters in the order of display.

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

## Tips

* On mobile, it is not easy selecting texts and apply HTML. So, in mobile, you may show only thoese buttons that does not require text selection like format, left, center, right, ol, ul, etc.
