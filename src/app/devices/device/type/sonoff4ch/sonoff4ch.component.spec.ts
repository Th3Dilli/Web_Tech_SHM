import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sonoff4chComponent } from './sonoff4ch.component';

describe('Sonoff4chComponent', () => {
  let component: Sonoff4chComponent;
  let fixture: ComponentFixture<Sonoff4chComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sonoff4chComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sonoff4chComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
