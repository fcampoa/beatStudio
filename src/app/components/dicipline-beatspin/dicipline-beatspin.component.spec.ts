import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiciplineBeatspinComponent } from './dicipline-beatspin.component';

describe('DiciplineBeatspinComponent', () => {
  let component: DiciplineBeatspinComponent;
  let fixture: ComponentFixture<DiciplineBeatspinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiciplineBeatspinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiciplineBeatspinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
