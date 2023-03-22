import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoReporteComponent } from './estado-reporte.component';

describe('EstadoReporteComponent', () => {
  let component: EstadoReporteComponent;
  let fixture: ComponentFixture<EstadoReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
