# Angular Simple Editor

## Why

* I have searched for Angular/Ionic Web editors and I couldn't find simple one. All of them have dependencies like jQury, Bootstrap, Fontawesome, etc.
* So I made one. It's deadly simple. Easy to edit. No dependencies at all.

## Demo

* [GitHub Page Demo](https://thruthesky.github.io/ng-simple-editor/)

## Example code

* @see [Example Component Template](https://github.com/thruthesky/ng-simple-editor/blob/master/src/app/app.component.html)

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

* Two-way binding. Don't forget to put 'name' attribute if it is used in form.

````html
<ng-simple-editor [init]="{ cursor: true }" [icons]="true" name="html" [(html)]=" html "></ng-simple-editor>
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
  [buttons]="['bold', 'italic', 'unerline', 'fontname', 'fontsize', 'forecolor', 'backcolor', 'highlight', 'link', 'unink', 'table', 'formatblock', 'insertline', 'insertimage', 'orderedlist', 'unorderedlist', 'left', 'center', 'right', 'removeformat', 'strike', 'big', 'normal']"
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

* Name of buttons

'bold' | 'italic' | 'underline' | 'fontsize' | 'forecolor' | 'backcolor'
  | 'highlight' | 'link' | 'unlink' | 'table' | 'fontname' | 'formatblock' | 'indent' | 'outdent'
  | 'insertline' | 'insertimage' | 'orderedlist' | 'unorderedlist' | 'left' | 'center' | 'right'
  | 'removeformat' | 'strke' | 'big' | 'normal'

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

## Init options

* `content` (string) - initial content. It may be overwritten by two-way binding. Default `empty string`.
* `cursor` (boolean) - to put cursor inside editor. Default `false`.
* `menuTop` (boolean) - to show menu buttons on top. Default `true`.
* `menuBottom` (boolean) - to show menu buttons at bottom. Default `true`.

## How to upload files

* `ng-simple-editor` does not have file/photo/video upload functionaliy but it has image buttons on the menu which selects a file when it is clicked. Then it fires `fileChange` event with the chosen file event. You can make your own file upload function in your app with this event.

* You can insert image into the editor with `editor.insertImage()`.

## Design

* `ViewEncapsulation.None` is set on the `NgSimpleEditorComponent`.
* DOM structure

```` html
div.editor
  div.buttons
  div.content
````

* Example of auto grow for editor content. You may remove [+] and [-] button in this case.

```` css
.editor {
    .content {
        height: auto !important;
        min-height: 120px;
        max-height: 200px;
    }
}
````

### Design Example

```` scss
// Image design
@mixin image {
    img {
        display: inline-block;
        margin: .4em 0;
        padding: .4em;
        box-sizing: border-box;
        background-color: #f3f3f3;
    }
}
// Simple Editor Design
.editor {
    margin-bottom: 1em;
    .content {
        // height
        height: auto !important;
        min-height: 220px;
        max-height: 340px;
        @media all and (min-width: 768px) {
            min-height: 400px;
            max-height: 600px;
        }
        font-size: 1rem;
        @include image();
    }
}
// Post view page design which shows the post that are created by simple-editor.
.post-content.simple-editor {
    @include image();
}
````


## Tips

* On mobile, it is not easy selecting texts and apply HTML. So, in mobile, you may show only thoese buttons that does not require text selection like format, left, center, right, ol, ul, etc.

## Todo

* [Git issues](https://github.com/thruthesky/ng-simple-editor/issues)

## Bug report

* [Git issues](https://github.com/thruthesky/ng-simple-editor/issues)
