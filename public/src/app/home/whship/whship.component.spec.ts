import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhshipComponent } from './whship.component';

describe('WhshipComponent', () => {
  let component: WhshipComponent;
  let fixture: ComponentFixture<WhshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
