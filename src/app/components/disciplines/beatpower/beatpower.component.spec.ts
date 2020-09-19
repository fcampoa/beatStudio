import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatpowerComponent } from './beatpower.component';

describe('BeatpowerComponent', () => {
  let component: BeatpowerComponent;
  let fixture: ComponentFixture<BeatpowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatpowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatpowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
