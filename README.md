# angular-wysiwyg-editor

## Install

This is a github repository containg a simple wysiwyg component module.

* You can simply git submodule add and import wysiwyg component module

```` sh
git submodule add https://github.com/thruthesky/angular-wysiwyg-editor src/app/modules/angular-wysiwyg-editor
````

* And add it to app module or any where.

```` typescript
import { EditorModule } from 'app/modules/angular-wysiwyg-editor/editor.module';
@NgModule({
  imports: [
    EditorModule
  ],
})
````

* Show like below.
  If [buttons] is omitted, then it shows all the possible butttons.

```` html
  <app-editor-component #editorComponent
    [buttons]="['bold', 'italic', 'underline', 'fontsize', 'forecolor', 'backcolor', 'highlight', 'link', 'unink', 'table', 'formatblock', 'insertline', 'insertimage', 'orderedlist', 'unorderedlist', 'left', 'center', 'removeformat', 'strike', 'big', 'normal']"
  ></app-editor-component>
````

* And put/get the HTML content of the editor like below.

```` typescript
/**
 * Put html into the editor
 */
ngAfterViewInit() {
    this.editorComponent.putContent( this.post['content_original'] );
}
/**
 * Get the HTML of editor
 */
const html = this.editorComponent.getContent();
````

* There is another handy way to insert HTML into editor.
  When the component is created dynamically using `*ngIf=" ... "`, it is not easy to know when `@ViewChild() editor: EditComponet;` is ready to use `editor.putContent()`. It often causes `calling putContent() of undefined`. In this case you can use `[init]` property to insert the default HTML content into editor.

```` html
<app-editor-component #editorComponent *ngIf=" mode != 'fake' "
  [init]=" { content: comment.content_original }"
  [buttons]="['bold', 'italic', 'unerline', 'fontsize', 'forecolor', 'backcolor', 'highlight', 'link', 'unink', 'table', 'formatblock', 'insertline', 'insertimage', 'orderedlist', 'unorderedlist', 'left', 'center', 'removeformat', 'strike', 'big', 'normal']"
></app-editor-component>
````

* How to set cursor.
  For post writing, you will need to put cursor on subject input tag.
  For comment write/edit, you will need to put cursor on editor.

```` html
      <app-editor-component #editorComponent *ngIf=" mode != 'fake' "
        [init]=" { content: comment?.content_original, cursor: true }"
        [buttons]="['bold', 'italic', 'underline', 'strike', 'fontsize', 'forecolor', 'backcolor', 'highlight', 'link', 'unink', 'table', 'formatblock', 'insertline', 'insertimage', 'orderedlist', 'unorderedlist', 'left', 'center', 'removeformat', 'big', 'normal']"
      ></app-editor-component>
````

* See examples folder to get sample working code.
    You can delete sample folder if you don't want.

## Buttons

* Buttons on editor appears in the order as they were given by [buttons] @Input() property.
