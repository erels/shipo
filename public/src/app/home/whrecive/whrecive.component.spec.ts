import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhreciveComponent } from './whrecive.component';

describe('WhreciveComponent', () => {
  let component: WhreciveComponent;
  let fixture: ComponentFixture<WhreciveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhreciveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhreciveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
