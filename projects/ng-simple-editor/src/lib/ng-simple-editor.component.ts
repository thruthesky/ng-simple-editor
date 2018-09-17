import {
  Component, OnInit, ViewChild, ElementRef, Input, HostListener, OnChanges, AfterViewInit, ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';


type COMMAND = 'bold' | 'italic' | 'underline' | 'fontsize' | 'forecolor' | 'backcolor'
  | 'highlight' | 'link' | 'unlink' | 'table' | 'fontname' | 'formatblock' | 'indent' | 'outdent'
  | 'insertline' | 'insertimage' | 'orderedlist' | 'unorderedlist' | 'left' | 'center' | 'right'
  | 'removeformat' | 'strke' | 'big' | 'normal';

@Component({
  selector: 'ng-simple-editor',
  template: `
  <ng-template #tBold><button type="button" (click)="bold( $event )">{{ t.bold }}</button></ng-template>
<ng-template #tItalic><button type="button" (click)="italic( $event )">{{ t.italic }}</button></ng-template>
<ng-template #tUnderline><button type="button" (click)="underline( $event )">{{ t.underline }}</button></ng-template>
<ng-template #tStrike><button type="button" (click)="strikeThrough( $event )">{{ t.strike }}</button></ng-template>
<ng-template #tFontsize>
    <select (change)="fontSize( $event )">
        <option value='0'>{{ t.size }}</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
      </select>
</ng-template>
<ng-template #tForecolor>
    <select (change)="forecolor( $event )">
    <option value=''>{{ t.forecolor }}</option>
    <option value='black'>Black</option>
    <option value='blue'>Blue</option>
    <option value='blueviolet'>BlueViolet</option>
    <option value='brown'>Brown</option>
    <option value='gold'>Gold</option>
    <option value='green'>Green</option>
    <option value='grey'>Grey</option>
    <option value='navy'>Navy</option>
    <option value='red'>Red</option>
    <option value='tomato'>Tomato</option>
    <option value='yellow'>Yellow</option>
  </select>
</ng-template>
<ng-template #tBackcolor>
    <select (change)="backcolor( $event )">
        <option value=''>{{ t.backcolor }}</option>
        <option value='black'>Black</option>
        <option value='blue'>Blue</option>
        <option value='blueviolet'>BlueViolet</option>
        <option value='brown'>Brown</option>
        <option value='darkblue'>DarkBlue</option>
        <option value='gold'>Gold</option>
        <option value='green'>Green</option>
        <option value='grey'>Grey</option>
        <option value='navy'>Navy</option>
        <option value='red'>Red</option>
        <option value='tomato'>Tomato</option>
        <option value='yellow'>Yellow</option>
      </select>
</ng-template>
<ng-template #tHighlight>
    <select (change)="highlight( $event )">
        <option value=''>{{ t.highlight }}</option>
        <option value='black,white'>Black and White</option>
        <option value='blue,white'>Blue and White</option>
        <option value='green,white'>Green and White</option>
        <option value='red,white'>Red and White</option>
        <option value='gold,white'>Yellow and White</option>
      </select>
</ng-template>
<ng-template #tLink><button type="button" (click)="link( $event )">{{ t.link }}</button></ng-template>
<ng-template #tUnlink><button type="button" (click)="unlink( $event )">{{ t.unlink }}</button></ng-template>
<ng-template #tTable>
    <select (change)="table( $event )">
        <option value=''>{{ t.table }}</option>
        <option value='1x2'>1x2</option>
        <option value='1x3'>1x3</option>
        <option value='1x4'>1x4</option>
        <option value='1x5'>1x5</option>
        <option value='2x2'>2x2</option>
        <option value='2x3'>2x3</option>
        <option value='2x4'>2x4</option>
        <option value='2x5'>2x5</option>
        <option value='3x2'>3x2</option>
        <option value='3x3'>3x3</option>
        <option value='3x4'>3x4</option>
        <option value='3x5'>3x5</option>
        <option value='4x2'>4x2</option>
        <option value='4x3'>4x3</option>
        <option value='4x4'>4x4</option>
        <option value='4x5'>4x5</option>
        <option value='5x2'>5x2</option>
        <option value='5x3'>5x3</option>
        <option value='5x4'>5x4</option>
        <option value='5x5'>5x5</option>
      </select>
</ng-template>
<ng-template #tFontname>
    <select (change)="fontName( $event )">
        <option value=''>{{ t.fontname }}</option>
        <option value='Arial'>Arial</option>
        <option value='Arial Black'>Arial Black</option>
        <option value='Comic Sans MS'>Comic Sans MS</option>
        <option value='Courier New'>Courier New</option>
        <option value='Georgia'>Georgia</option>
        <option value='Helvetica'>Helvetica</option>
        <option value='Impact'>Impact</option>
        <option value='Times New Roman'>Times New Roman</option>
        <option value='Verdana'>Verdana</option>
        <option value='맑은 고딕,Malgun Gothic,AppleGothic'>맑은 고딕</option>
      </select>
</ng-template>
<ng-template #tFormatblock>
    <select (change)="formatBlock( $event )">
        <option value=''>{{ t.format }}</option>
        <option value='H1'>H1</option>
        <option value='H2'>H2</option>
        <option value='H3'>H3</option>
        <option value='H4'>H4</option>
        <option value='H5'>H5</option>
        <option value='H6'>H6</option>
        <option value='P'>Paragraph</option>
      </select>
</ng-template>
<ng-template #tIndent><button type="button" (click)="indent( $event )">{{ t.indent }}</button></ng-template>
<ng-template #tOutdent><button type="button" (click)="outdent( $event )">{{ t.outdent }}</button></ng-template>
<ng-template #tInsertline><button type="button" (click)="insertHorizontalRule( $event )">{{ t.line }}</button></ng-template>
<ng-template #tImage><button type="button" (click)="insertImage()">{{ t.image }}</button></ng-template>
<ng-template #tOrderedlist><button type="button" (click)="insertOrderedList( $event )">{{ t.orderedlist }}</button></ng-template>
<ng-template #tUnorderedlist><button type="button" (click)="insertUnorderedList( $event )">{{ t.unorderedlist }}</button></ng-template>
<ng-template #tLeft><button type="button" (click)="justifyLeft( $event )">{{ t.left }}</button></ng-template>
<ng-template #tCenter><button type="button" (click)="justifyCenter( $event )">{{ t.center }}</button></ng-template>
<ng-template #tRight><button type="button" (click)="justifyRight( $event )">{{ t.right }}</button></ng-template>
<ng-template #tUnformat><button type="button" (click)="removeFormat( $event )">{{ t.unformat }}</button></ng-template>
<ng-template #tBigview><button type="button" (click)="bigContentSize( $event )">{{ t.bigView }}</button></ng-template>
<ng-template #tSmallview><button type="button" (click)="originalContentSize( $event )">{{ t.smallView }}</button></ng-template>

<div class="editor">
  <div class="buttons">
    <ng-container *ngFor="let T of containerButtons">
    <ng-container *ngTemplateOutlet=" T "></ng-container>
    </ng-container>
  </div>
  <div #editorContent class="content" [attr.size]=" contentSize " contenteditable="true"
    (input)=" onChange( $event ) ">
  </div>
</div>

  `,
  styles: [
    `
    .editor .content {
      padding: 8px;
      overflow: auto;
      border: 1px solid grey;
      box-sizing: border-box;
      width: 100%;
      height: 200px;
      background-color: white;
      color: black;
  }
  .editor .content[size='big'] {
      height: 600px;
  }
  .editor .content img {
      max-width: 100%;
  }
  `
  ],
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
  @ViewChild('tUnformat') tUnformat: ElementRef;
  @ViewChild('tBigview') tBigview: ElementRef;
  @ViewChild('tSmallview') tSmallview: ElementRef;

  /**
   * When content changes, 'change' event with content will be fired.
   * @desc This will fire with all the changes. Not only text changes but also HTML tag changes.
   */
  @Output() change = new EventEmitter();
  @Input() init = {
    content: '',
    cursor: false
  };

  /**
 * default buttons.
 */
  @Input() buttons: Array<COMMAND> = [];

  nameButtons: { [name: string]: ElementRef } = {};
  containerButtons: Array<ElementRef> = [];

  contentSize: 'big' | 'normal' = 'normal';

  t = {
    strike: 'Strike',
    size: 'Size',
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
    unformat: 'Unformat',
    bigView: '+',
    smallView: '-',
    line: 'Line',
    bold: 'B',
    italic: 'I',
    underline: 'U'
  };

  tKorean = {
    strike: '가운데줄',
    size: '글자크기',
    forecolor: '글자색',
    backcolor: '배경색',
    highlight: '강조표시',
    link: '링크',
    unlink: '링크해제',
    table: '테이블',
    fontname: '글자체',
    format: '포멧(헤더)',
    indent: '들여쓰기',
    outdent: '내어쓰기',
    image: '사진',
    orderedlist: '목록(점)',
    unorderedlist: '목록(번호)',
    left: '왼쪽',
    center: '중간',
    right: '오른쪽',
    unformat: '양식제거',
    bigView: '크게',
    smallView: '작게',
    line: '라인분리',
    bold: '굵게',
    italic: '기울기',
    underline: '밑줄'
  };


  constructor() {
  }


  ngOnInit() {
  }

  ngOnChanges() {
    console.log(' ==> ngOnChanges() ');
    /**
     * @desc `resetButtons()` must be needed here because @Input property - [buttons] may changes at anytime.
     */
    setTimeout(() => this.resetButtons(), 50);
  }

  ngAfterViewInit() {

    console.log(' ==> ngAfterViewInit() ');

    this.nameButtons['bold'] = this.tBold;
    this.nameButtons['italic'] = this.tItalic;
    this.nameButtons['underline'] = this.tUnderline;
    this.nameButtons['strike'] = this.tStrike;
    this.nameButtons['fontsize'] = this.tFontsize;
    this.nameButtons['forecolor'] = this.tForecolor;
    this.nameButtons['backcolor'] = this.tBackcolor;
    this.nameButtons['highlight'] = this.tHighlight;
    this.nameButtons['link'] = this.tLink;
    this.nameButtons['unlink'] = this.tUnlink;
    this.nameButtons['table'] = this.tTable;
    this.nameButtons['fontname'] = this.tFontname;
    this.nameButtons['formatblock'] = this.tFormatblock;
    this.nameButtons['indent'] = this.tIndent;
    this.nameButtons['outdent'] = this.tOutdent;
    this.nameButtons['insertline'] = this.tInsertline;
    this.nameButtons['insertimage'] = this.tImage;
    this.nameButtons['orderedlist'] = this.tOrderedlist;
    this.nameButtons['unorderedlist'] = this.tUnorderedlist;
    this.nameButtons['left'] = this.tLeft;
    this.nameButtons['center'] = this.tCenter;
    this.nameButtons['right'] = this.tRight;
    this.nameButtons['removeformat'] = this.tUnformat;
    this.nameButtons['big'] = this.tBigview;
    this.nameButtons['normal'] = this.tSmallview;

    console.log('EditorComponent::ngAfterViewInit() ', this.init);
    if (this.init.content) {
      this.putContent(this.init.content);
    }

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

    console.log('resetButtons()');

    /**
     * Add buttons on button list
     */
    if (this.buttons && this.buttons.length) {
      console.log('buttons: ', this.buttons);
      for (const k of this.buttons) {
        if (this.is(k)) {
          this.containerButtons.push(this.nameButtons[k]);
        }
      }
    } else {
      console.log('buttons is empty');
      for (const k of Object.keys(this.nameButtons)) {
        this.containerButtons.push(this.nameButtons[k]);
      }
    }

  }
  /**
   * 커서를 에디터 맨 마지막에 놓는다.
   *
   * 소스코드를 https://gist.github.com/al3x-edge/1010364 에서 가져왔다.
   *
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
   * @param querySelector() 에 들어가는 표현. 이 표현으로 삭제할 항목(HTML Element)을 매치한다.
   */
  removeContent(exp) {
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
   * Returns true if buttons array has buttonName.
   * @param buttonName button name
   * @return
   *  false if the buttons array is empty or buttonName is not found.
   */
  is(buttonName: COMMAND): boolean {
    if (!this.buttons && !this.buttons.length) {
      return false;
    } else {
      return this.buttons.indexOf(buttonName) !== -1;
    }
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
    console.log('link: ', link);
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
   * 이미지를 추가 할 때, style 을 같이 추가해야 하기 때문에, insertHTML 로 한다.
   * @param src Image src
   * @param name Image name
   */
  insertImage(src?, name?, idx?) {
    if (!src) {
      src = prompt('Enter a link', 'http://');
    }
    if (!this.getCaret()) {
      this.setEndOfContenteditable();
    }
    const tag = `<IMG class="editor-image" SRC="${src}" ALT="${name}" idx="${idx}" style="max-width: 100%;"><BR>Image: ${name}<BR>`;
    this.execCommand('insertHTML', false, tag);
    this.setEndOfContenteditable();
    // this.execCommand('insertImage', false, src);
  }
  bigContentSize(event: Event) {
    this.contentSize = 'big';
  }
  originalContentSize(event: Event) {
    this.contentSize = 'normal';
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
  }
}
