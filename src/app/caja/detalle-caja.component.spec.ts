import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCajaComponent } from './detalle-caja.component';

describe('DetalleCajaComponent', () => {
  let component: DetalleCajaComponent;
  let fixture: ComponentFixture<DetalleCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
