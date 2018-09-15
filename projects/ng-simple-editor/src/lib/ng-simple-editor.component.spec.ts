import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSimpleEditorComponent } from './ng-simple-editor.component';

describe('NgSimpleEditorComponent', () => {
  let component: NgSimpleEditorComponent;
  let fixture: ComponentFixture<NgSimpleEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSimpleEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSimpleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
