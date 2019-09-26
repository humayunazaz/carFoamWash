import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmScheduleComponent } from './confirm-schedule.component';

describe('ConfirmScheduleComponent', () => {
  let component: ConfirmScheduleComponent;
  let fixture: ComponentFixture<ConfirmScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
