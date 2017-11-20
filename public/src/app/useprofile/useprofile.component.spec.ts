import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseprofileComponent } from './useprofile.component';

describe('UseprofileComponent', () => {
  let component: UseprofileComponent;
  let fixture: ComponentFixture<UseprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
