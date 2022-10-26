import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEmpComponent } from './reporte-emp.component';

describe('ReporteEmpComponent', () => {
  let component: ReporteEmpComponent;
  let fixture: ComponentFixture<ReporteEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
