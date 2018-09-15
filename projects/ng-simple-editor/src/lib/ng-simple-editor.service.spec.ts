import { TestBed } from '@angular/core/testing';

import { NgSimpleEditorService } from './ng-simple-editor.service';

describe('NgSimpleEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSimpleEditorService = TestBed.get(NgSimpleEditorService);
    expect(service).toBeTruthy();
  });
});
