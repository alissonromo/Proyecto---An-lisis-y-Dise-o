import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitadoTecnicoComponent } from './tramitado-tecnico.component';

describe('TramitadoTecnicoComponent', () => {
  let component: TramitadoTecnicoComponent;
  let fixture: ComponentFixture<TramitadoTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitadoTecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitadoTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
