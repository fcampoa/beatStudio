import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatspinComponent } from './beatspin.component';

describe('BeatspinComponent', () => {
  let component: BeatspinComponent;
  let fixture: ComponentFixture<BeatspinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatspinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatspinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
