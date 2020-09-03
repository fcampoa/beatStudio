import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatyogaComponent } from './beatyoga.component';

describe('BeatyogaComponent', () => {
  let component: BeatyogaComponent;
  let fixture: ComponentFixture<BeatyogaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatyogaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatyogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
