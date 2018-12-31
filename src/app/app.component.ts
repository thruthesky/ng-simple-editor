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
  html = `<b style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">Lyrics</b><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">&nbsp;are&nbsp;</span><a href="https://en.wikipedia.org/wiki/Word" title="Word" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">words</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">&nbsp;that make up a&nbsp;</span><a href="https://en.wikipedia.org/wiki/Song" title="Song" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">song</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">&nbsp;usually consisting of&nbsp;</span><a href="https://en.wikipedia.org/wiki/Verse_(poetry)" title="Verse (poetry)" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">verses</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">&nbsp;and&nbsp;</span><a href="https://en.wikipedia.org/wiki/Refrain" title="Refrain" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">choruses</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">. The writer of lyrics is a&nbsp;</span><a href="https://en.wikipedia.org/wiki/Lyricist" title="Lyricist" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">lyricist</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">. The words to an extended musical composition such as an&nbsp;</span><a href="https://en.wikipedia.org/wiki/Opera" title="Opera" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">opera</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">&nbsp;are, however, usually known as a "</span><a href="https://en.wikipedia.org/wiki/Libretto" title="Libretto" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">libretto</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">" and their writer, as a "</span><a href="https://en.wikipedia.org/wiki/Librettist" class="mw-redirect" title="Librettist" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">librettist</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">". The meaning of lyrics can either be explicit or implicit. Some lyrics are abstract, almost unintelligible, and, in such cases, their explication emphasizes&nbsp;</span><a href="https://en.wikipedia.org/wiki/Musical_form" title="Musical form" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">form</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">,&nbsp;</span><a href="https://en.wikipedia.org/wiki/Articulation_(music)" title="Articulation (music)" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">articulation</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">,&nbsp;</span><a href="https://en.wikipedia.org/wiki/Meter_(poetry)" class="mw-redirect" title="Meter (poetry)" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">meter</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">, and&nbsp;</span><a href="https://en.wikipedia.org/wiki/Symmetry" title="Symmetry" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">symmetry</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">&nbsp;of expression. Rappers can also create lyrics (often with a variation of rhyming words) that are meant to be&nbsp;</span><a href="https://en.wikipedia.org/wiki/Rapping" title="Rapping" style="text-decoration-line: none; color: rgb(11, 0, 128); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: sans-serif; font-size: 14px;">spoken rhythmically</a><span style="color: rgb(34, 34, 34); font-family: sans-serif; font-size: 14px;">&nbsp;rather than sung.</span>`;

  @ViewChild('editor') editor: NgSimpleEditorComponent;

  ngAfterContentInit() {
    this.editor.putContent(`<h1>Let's Edit!</h1>`);
  }

  onChange(event: Event) {
    this.content = this.editor.content;
  }
}
