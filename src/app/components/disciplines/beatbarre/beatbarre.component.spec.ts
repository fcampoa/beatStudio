import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatbarreComponent } from './beatbarre.component';

describe('BeatbarreComponent', () => {
  let component: BeatbarreComponent;
  let fixture: ComponentFixture<BeatbarreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatbarreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatbarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
