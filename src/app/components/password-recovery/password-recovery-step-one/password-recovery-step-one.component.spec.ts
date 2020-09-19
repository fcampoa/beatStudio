import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryStepOneComponent } from './password-recovery-step-one.component';

describe('PasswordRecoveryStepOneComponent', () => {
  let component: PasswordRecoveryStepOneComponent;
  let fixture: ComponentFixture<PasswordRecoveryStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
