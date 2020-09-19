import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryStepTwoComponent } from './password-recovery-step-two.component';

describe('PasswordRecoveryStepTwoComponent', () => {
  let component: PasswordRecoveryStepTwoComponent;
  let fixture: ComponentFixture<PasswordRecoveryStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
