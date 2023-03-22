import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAveriaComponent } from './consulta-averia.component';

describe('ConsultaAveriaComponent', () => {
  let component: ConsultaAveriaComponent;
  let fixture: ComponentFixture<ConsultaAveriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaAveriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAveriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
