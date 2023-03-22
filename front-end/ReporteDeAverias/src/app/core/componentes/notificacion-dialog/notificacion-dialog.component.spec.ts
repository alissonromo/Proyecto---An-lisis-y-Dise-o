import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionDialogComponent } from './notificacion-dialog.component';

describe('NotificacionDialogComponent', () => {
  let component: NotificacionDialogComponent;
  let fixture: ComponentFixture<NotificacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
