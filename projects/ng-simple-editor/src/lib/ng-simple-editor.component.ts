import {
  Component, OnInit, ViewChild, ElementRef, Input, HostListener, OnChanges, AfterViewInit, ViewEncapsulation,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';


type COMMAND = 'bold' | 'italic' | 'underline' | 'fontsize' | 'forecolor' | 'backcolor'
  | 'highlight' | 'link' | 'unlink' | 'table' | 'fontname' | 'formatblock' | 'indent' | 'outdent'
  | 'insertline' | 'insertimage' | 'orderedlist' | 'unorderedlist' | 'left' | 'center' | 'right'
  | 'removeformat' | 'strke' | 'big' | 'normal';

@Component({
  selector: 'ng-simple-editor',
  templateUrl: 'ng-simple-editor.component.html',
  styleUrls: ['ng-simple-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgSimpleEditorComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('editorContent') editorComponent: ElementRef;

  @ViewChild('tBold') tBold: ElementRef;
  @ViewChild('tItalic') tItalic: ElementRef;
  @ViewChild('tUnderline') tUnderline: ElementRef;
  @ViewChild('tStrike') tStrike: ElementRef;
  @ViewChild('tFontsize') tFontsize: ElementRef;
  @ViewChild('tForecolor') tForecolor: ElementRef;
  @ViewChild('tBackcolor') tBackcolor: ElementRef;
  @ViewChild('tHighlight') tHighlight: ElementRef;
  @ViewChild('tLink') tLink: ElementRef;
  @ViewChild('tUnlink') tUnlink: ElementRef;
  @ViewChild('tTable') tTable: ElementRef;
  @ViewChild('tFontname') tFontname: ElementRef;
  @ViewChild('tFormatblock') tFormatblock: ElementRef;
  @ViewChild('tIndent') tIndent: ElementRef;
  @ViewChild('tOutdent') tOutdent: ElementRef;
  @ViewChild('tInsertline') tInsertline: ElementRef;
  @ViewChild('tImage') tImage: ElementRef;
  @ViewChild('tOrderedlist') tOrderedlist: ElementRef;
  @ViewChild('tUnorderedlist') tUnorderedlist: ElementRef;
  @ViewChild('tLeft') tLeft: ElementRef;
  @ViewChild('tCenter') tCenter: ElementRef;
  @ViewChild('tRight') tRight: ElementRef;
  @ViewChild('tRemoveFormat') tRemoveFormat: ElementRef;
  @ViewChild('tBigview') tBigview: ElementRef;
  @ViewChild('tSmallview') tSmallview: ElementRef;
  @ViewChild('tFullview') tFullview: ElementRef;


  @Input() html = '';
  @Output() htmlChange = new EventEmitter<string>();

  /**
   * When content changes, 'change' event with content will be fired.
   * @desc This will fire with all the changes. Not only text changes but also HTML tag changes.
   */
  @Output() change = new EventEmitter();
  @Input() init = {
    content: '',
    cursor: false
  };
  @Input() icons = false;

  /**
 * default buttons.
 */
  @Input() buttons: Array<COMMAND> = null;

  supportedButtons: { [name: string]: ElementRef } = {};
  containerButtons: Array<ElementRef> = [];

  contentSize: 'big' | 'normal' | 'full' = 'normal';

  t = {
    strike: 'Strike',
    fontsize: 'Size',
    forecolor: 'Color',
    backcolor: 'Background Color',
    highlight: 'Highlight',
    link: 'Link',
    unlink: 'Unlink',
    table: 'Table',
    fontname: 'Font Name',
    format: 'Format',
    indent: 'indent',
    outdent: 'outdent',
    image: 'Image',
    orderedlist: 'OL',
    unorderedlist: 'UL',
    left: 'Left',
    center: 'Center',
    right: 'Right',
    removeformat: 'Remove Format',
    bigView: '+',
    smallView: '-',
    insertline: 'Line',
    bold: 'B',
    italic: 'I',
    underline: 'U',
    fullView: 'Full'
  };

  constructor() {
    window['editor'] = this;
  }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(' ==> ngOnChanges() ');
    /**
     * @desc `resetButtons()` must be needed here because @Input property - [buttons] may changes at anytime.
     */
    setTimeout(() => this.resetButtons(), 50);
    if (changes['html']) {
      const html = changes['html'];
      if (html.previousValue !== html.currentValue) {
        this.putContent(html.currentValue);
      }
    }
  }

  ngAfterViewInit() {

    // console.log(' ==> ngAfterViewInit() ');
    this.supportedButtons['bold'] = this.tBold;
    this.supportedButtons['italic'] = this.tItalic;
    this.supportedButtons['underline'] = this.tUnderline;
    this.supportedButtons['strike'] = this.tStrike;
    this.supportedButtons['fontsize'] = this.tFontsize;
    this.supportedButtons['forecolor'] = this.tForecolor;
    this.supportedButtons['backcolor'] = this.tBackcolor;
    this.supportedButtons['highlight'] = this.tHighlight;
    this.supportedButtons['link'] = this.tLink;
    this.supportedButtons['unlink'] = this.tUnlink;
    this.supportedButtons['table'] = this.tTable;
    this.supportedButtons['fontname'] = this.tFontname;
    this.supportedButtons['formatblock'] = this.tFormatblock;
    this.supportedButtons['indent'] = this.tIndent;
    this.supportedButtons['outdent'] = this.tOutdent;
    this.supportedButtons['insertline'] = this.tInsertline;
    this.supportedButtons['insertimage'] = this.tImage;
    this.supportedButtons['orderedlist'] = this.tOrderedlist;
    this.supportedButtons['unorderedlist'] = this.tUnorderedlist;
    this.supportedButtons['left'] = this.tLeft;
    this.supportedButtons['center'] = this.tCenter;
    this.supportedButtons['right'] = this.tRight;
    this.supportedButtons['removeformat'] = this.tRemoveFormat;
    this.supportedButtons['big'] = this.tBigview;
    this.supportedButtons['normal'] = this.tSmallview;
    this.supportedButtons['full'] = this.tFullview;

    // console.log('EditorComponent::ngAfterViewInit() ', this.init);

    /**
     * Default content
     */
    if (this.init.content) {
      this.putContent(this.init.content);
    }

    /**
     * If this.html has value, it is applied.
     */
    if (this.html) {
      this.putContent(this.html);
    }

    /**
     * Set cursor awhile later.
     */
    setTimeout(() => {
      if (this.init.cursor) {
        this.setEndOfContenteditable();
      }
    }, 100);


    /**
     * It needs to be here because @Input() property [buttons] may not be declared on the component.
     * Which leads no 'ngOnChanges()' call.
     * Which leads no buttons appears.
     */
    setTimeout(() => this.resetButtons(), 50);

  }

  resetButtons() {
    /**
     * Empty container
     */
    this.containerButtons = [];

    // console.log('resetButtons()');

    /**
     * Add buttons on button list
     */
    if (this.buttons) {
      for (const k of this.buttons) {
        // @Input() button is an array of string?
        if (typeof k === 'string') {
          if (this.isSupported(k)) {
            this.containerButtons.push(this.supportedButtons[k]);
          }
        } else {
          // @Input() button is an array of object?
          const button = k['button'];
          // console.log('button: ', button);
          if (this.isSupported(button)) {
            // console.log('k: ', k);
            this.containerButtons.push(this.supportedButtons[button]);
            this.t[button] = k['text'];
          }
        }
      }
    } else {
      // console.log('@Input() buttons is empty. Display all buttons');
      for (const k of Object.keys(this.supportedButtons)) {
        this.containerButtons.push(this.supportedButtons[k]);
      }
    }

  }
  /**
   * Put cursor at the end of editor.
   */
  setEndOfContenteditable() {
    const contentEditableElement = this.editorComponent.nativeElement;
    let range, selection;
    // Firefox, Chrome, Opera, Safari, IE 9+
    if (document.createRange) {
      range = document.createRange(); // Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement); // Select the entire contents of the element with the range
      range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); // get the selection object (allows you to change selection)
      selection.removeAllRanges(); // remove any selections already made
      selection.addRange(range); // make the range you have just created the visible selection
    } else if (document['selection']) {
      // IE 8 and lower
      range = document.body['createTextRange'](); // Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement); // Select the entire contents of the element with the range
      range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
      range.select(); // Select the range (make it the visible selection
    }
  }


  /**
   * 에디터의 커서 위치를 찾는다.
   * 에디터에 커서가 위치하지 않았으면 0을 리턴한다.
   * 주의. 커서가 에디터에 있는지 없는지만 판별해서, 커서가 에디터에 없으면, 커서를 추가하는 것만 한다. (이미지 추가 등에 필요)
   */
  getCaret() {
    const element = this.editorComponent.nativeElement;
    let caretOffset = 0;
    if (typeof window.getSelection !== 'undefined') {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    } else if (typeof document['selection'] !== 'undefined' && document['selection'].type !== 'Control') {
      const textRange = document['selection'].createRange();
      const preCaretTextRange = document.body['createTextRange']();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;

  }


  getContent(): string {
    return this.editorComponent.nativeElement.innerHTML;
  }

  get content(): string {
    return this.getContent();
  }

  putContent(html: string) {
    this.editorComponent.nativeElement.innerHTML = html;
  }
  /**
   * exp 에 해당하는 Element 를 삭제한다.
   * 편집기의 내용 중에서 삭제하고 싶은 것이 있으면 이 메소드를 사용하면 된다.
   *
   * @example
   *      this.editorComponent.removeContent(`img[idx="${idx}"]`);
   *
   * @param exp Javascript 함수의 querySelector() 에 들어가는 표현. 이 표현으로 삭제할 항목(HTML Element)을 매치한다.
   */
  removeContent(exp: string) {
    if (!exp) {
      return;
    }
    const container = this.editorComponent.nativeElement;
    const match = container.querySelector(exp);
    if (!match) {
      return;
    }
    container.removeChild(match);
    this.putContent(container.innerHTML);
  }

  /**
   * Returns true if the input button is supported by the editor.
   * @desc This checks if the input buttonName button exists in 'buttons' array.
   * @param buttonName button name
   * @return
   *  false if the buttons array is empty or buttonName is not found.
   */
  isSupported(buttonName: COMMAND): boolean {
    return this.supportedButtons[buttonName] !== void 0;
  }

  @HostListener('input', ['$event.target']) onContentChange(target: Element) {
    if (target && target.className && target.className === 'content') {
      // console.log('html: ', this.editorComponent.nativeElement.innerHTML);
    }
  }

  execCommand(commandName: string, ui = false, value?: any): boolean {
    return document.execCommand(commandName, ui, value);
  }

  bold(event: Event) {
    this.execCommand('bold');
    // const button = <HTMLButtonElement>event.target;
    // document.execCommand('bold', false, null);
  }
  italic(event: Event) {
    this.execCommand('italic');
  }
  underline(event: Event) {
    this.execCommand('underline');
  }
  fontSize(event: Event) {
    const target = <Element>event.target;
    const value = target['value'] + '';
    this.execCommand('fontSize', false, value);
    target['value'] = '0';
  }
  forecolor(event: Event) {
    const target = <Element>event.target;
    this.execCommand('forecolor', false, target['value']);
    target['value'] = '';
  }
  backcolor(event: Event) {
    const target = <Element>event.target;
    this.execCommand('backcolor', false, target['value']);
    target['value'] = '';
  }
  highlight(event: Event) {
    const target = <Element>event.target;
    const value = target['value'] + '';
    const backColor = value.split(',').shift();
    const foreColor = value.split(',').pop();
    this.execCommand('backColor', false, backColor);
    this.execCommand('foreColor', false, foreColor);
  }
  link(event: Event) {
    const link = prompt('Enter a link', 'http://');
    // console.log('link: ', link);
    if (link) {
      this.execCommand('createLink', false, link);
    }
  }
  unlink(event: Event) {
    this.execCommand('unlink', false, null);
  }
  table(event: Event) {
    const target = <Element>event.target;
    const value = target['value'] + '';
    const rows = parseInt(value.split('x').shift(), 10);
    const cols = parseInt(value.split('x').pop(), 10);
    let tag = `<TABLE border="1">`;
    for (let i = 1; i <= rows; i++) {
      tag += '<TR>';
      for (let j = 1; j <= cols; j++) {
        tag += `<TD>${i}x${j}</TD>`;
      }
      tag += '</TR>';
    }
    tag += '</TABLE>';
    this.execCommand('insertHTML', false, tag);
    target['value'] = '';
  }
  fontName(event: Event) {
    const target = <Element>event.target;
    this.execCommand('fontName', false, target['value']);
    target['value'] = '';
  }
  formatBlock(event: Event) {
    const target = <Element>event.target;
    this.execCommand('formatBlock', false, target['value']);
    target['value'] = '';
  }

  indent(event: Event) {
    this.execCommand('indent', false, null);
  }

  outdent(event: Event) {
    this.execCommand('outdent', false, null);
  }
  insertHorizontalRule(event: Event) {
    this.execCommand('insertHorizontalRule', false, null);
  }

  /**
   * Use this method to insert an image into editor.
   * @desc It needs to add style.
   * @desc You can use this method to dynamically insert image into the editor.
   *        For instance, You can make your own logic to upload a image and after upload image,
   *        Use this method to insert that image.
   * @param src Image src
   * @param name Image name
   * @param idx idx is unqiue index to identify which image you are dealing with.
   *            You can assign any value to idx and it's up to you how you are going to handle it.
   * @example
   *    this.editor.insertImage( 'http://domani.com/image.jpg', 'Image name', 'unique-no' );
   */
  insertImage(src?, name?, idx?) {
    if (!src) {
      src = prompt('Enter a link', 'http://');
    }
    if (!this.getCaret()) {
      this.setEndOfContenteditable();
    }
    /**
     * If the length of src is less than 9, then it is being considered wrong url.
     */
    if (src.length < 9) {
      return;
    }
    const tag = `<IMG class="editor-image" SRC="${src}" ALT="${name}" idx="${idx}" style="max-width: 100%;"><BR>Image: ${name}<BR>`;
    this.execCommand('insertHTML', false, tag);
    this.setEndOfContenteditable();
  }

  /**
   * Make the editor size bigger.
   * @param event event
   */
  bigContentSize(event?: Event) {
    this.contentSize = 'big';
  }
  /**
   * Make the eidtor size normal.
   * @param event event
   */
  originalContentSize(event?: Event) {
    this.contentSize = 'normal';
  }

  fullContentSize(event?: Event) {
    if (this.contentSize === 'full') {
      this.contentSize = 'normal';
    } else {
      this.contentSize = 'full';
    }
  }

  insertOrderedList(event: Event) {
    const target = <Element>event.target;
    this.execCommand('insertOrderedList', false, null);
  }
  insertUnorderedList(event: Event) {
    const target = <Element>event.target;
    this.execCommand('insertUnorderedList', false, null);
  }

  justifyLeft(event: Event) {
    const target = <Element>event.target;
    this.execCommand('justifyLeft', false, null);
  }
  justifyCenter(event: Event) {
    const target = <Element>event.target;
    this.execCommand('justifyCenter', false, null);
  }
  justifyRight(event: Event) {
    const target = <Element>event.target;
    this.execCommand('justifyRight', false, null);
  }
  removeFormat(event: Event) {
    const target = <Element>event.target;
    this.execCommand('removeFormat', false, null);
  }
  strikeThrough(event: Event) {
    const target = <Element>event.target;
    this.execCommand('strikeThrough', false, null);
  }


  /**
   * Returns browser language
   *
   * @param full If it is true, then it returns the full language string like 'en-US'.
   *              Otherwise, it returns the first two letters like 'en'.
   *
   * @returns
   *      - the browser language like 'en', 'en-US', 'ko', 'ko-KR'
   *      - null if it cannot detect a language.
   */
  getBrowserLanguage(full = false): string {
    const nav = window.navigator;
    const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
    let ln: string = null;
    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (let i = 0; i < nav.languages.length; i++) {
        const language = nav.languages[i];
        if (language && language.length) {
          ln = language;
          break;
        }
      }
    }

    // support for other well known properties in browsers
    for (let i = 0; i < browserLanguagePropertyKeys.length; i++) {
      const language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        ln = language;
        break;
      }
    }

    if (ln) {
      if (full === false) {
        ln = ln.substring(0, 2);
      }
    }

    return ln;
  }

  /**
   * It fires with all the (input) event including HTML changes.
   * @param event event
   */
  onChange(event: Event) {
    this.change.emit(event);
    this.htmlChange.emit(this.getContent());
  }

}

