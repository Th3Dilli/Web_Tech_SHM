import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonoffbasicComponent } from './sonoffbasic.component';

describe('SonoffbasicComponent', () => {
  let component: SonoffbasicComponent;
  let fixture: ComponentFixture<SonoffbasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonoffbasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonoffbasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
