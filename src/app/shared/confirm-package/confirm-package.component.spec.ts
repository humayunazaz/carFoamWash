import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPackageComponent } from './confirm-package.component';

describe('ConfirmPackageComponent', () => {
  let component: ConfirmPackageComponent;
  let fixture: ComponentFixture<ConfirmPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
