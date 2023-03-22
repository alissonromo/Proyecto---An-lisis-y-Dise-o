import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioridadReporteComponent } from './prioridad-reporte.component';

describe('PrioridadReporteComponent', () => {
  let component: PrioridadReporteComponent;
  let fixture: ComponentFixture<PrioridadReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrioridadReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioridadReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
