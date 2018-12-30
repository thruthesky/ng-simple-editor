# Angular Simple Editor

## Why

* I search Angular/Ionic Web editors and I couldn't find simple one. All of them have dependencies like jQury, Bootstrap, Fontawesome, etc.
* So I made one. It's deadly simple. Easy to edit. No dependencies at all.

## Demo

* [GitHub Page Demo](https://thruthesky.github.io/ng-simple-editor/)

## How to Install

```` sh
npm install --save ng-simple-editor
````

## How to serve as developer

### Serving

* You need to run two Angular building process. One for App component serving and the other is for editor building.

```` sh
ng s
````

```` sh
ng build ng-simple-editor --watch
````

### Publising

* Patch version in `projects/ng-simple-editor/package.json`.
* And run publish command.

```` sh
npm run lib:publish
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

* Two-way binding

````html
<ng-simple-editor [init]="{ cursor: true }" [icons]="true" [(html)]=" html "></ng-simple-editor>
HTML content: {{ html }}
````

* Event handling

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

* Display icons instead of text buttons.
  * To display icons, set `[icons]="true"` on the component.

```` html
<ng-simple-editor #editor4 [init]="{ cursor: true }" [icons]="true"></ng-simple-editor>
HTML content: {{ editor4.content }}
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

* Buttons on editor appears in the order of that they were given in [buttons] property.

## Events

### change event on content changes

```` html
<ng-simple-editor #editor (change)=" onChange( $event ) "></ng-simple-editor>
````

* If you are going to use `event` parameter from editor, it may contain not only the content but also other event. So, if you want to handle with the content of the ditor, use `this.editor.content` instead.

```` typescript
  onChange(event: Event) {
    this.content = this.editor.content;
  }
````

## How to upload files

* `ng-simple-editor` does not have file/photo/video upload functionaliy. You have to make your own file upload function in your app. And then you can insert your uploaded file into editor using `editor.insertImage()` method.

## Design

* `ViewEncapsulation.None` is set on the `NgSimpleEditorComponent`.
* DOM structure

```` html
div.editor
  div.buttons
  div.content
````

## Tips

* On mobile, it is not easy selecting texts and apply HTML. So, in mobile, you may show only thoese buttons that does not require text selection like format, left, center, right, ol, ul, etc.

## Todo

* [Git issues](https://github.com/thruthesky/ng-simple-editor/issues)

## Bug report

* [Git issues](https://github.com/thruthesky/ng-simple-editor/issues)
