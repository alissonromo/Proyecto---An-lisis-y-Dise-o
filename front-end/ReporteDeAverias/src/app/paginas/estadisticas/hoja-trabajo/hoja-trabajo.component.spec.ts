import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaTrabajoComponent } from './hoja-trabajo.component';

describe('HojaTrabajoComponent', () => {
  let component: HojaTrabajoComponent;
  let fixture: ComponentFixture<HojaTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HojaTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
