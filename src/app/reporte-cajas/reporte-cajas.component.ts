import { Component, OnInit } from '@angular/core';
import { separarMiles } from '../helper';
import { GrupoCaja } from '../models';
import { CajaService } from '../services/caja.service';
import { GrupoCajaService } from '../services/grupo-caja.service';
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'app-reporte-cajas',
  templateUrl: './reporte-cajas.component.html',
  styleUrls: ['./reporte-cajas.component.css'],
})
export class ReporteCajasComponent implements OnInit {
  reporte: GrupoCaja[];
  menu: String = '';
  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.cargarReporteGrupoCajas();
  }
  separarMiles(numero: number) {
    return separarMiles(numero);
  }
  tipoDeFondo(total: number, ultimoHijo?: any) {
    return {
      cero: total === 0,
      positivo: total > 0,
      negativo: total < 0,
      ...(ultimoHijo && {
        last_child: ultimoHijo,
      }),
    };
  }
  expandirMenu() {
    this.menu = this.menu === '' ? 'show' : '';
  }
  cambiarColapso(grupoCajas: GrupoCaja[]) {
    grupoCajas.forEach((gc) => {
      gc.collapsed = !gc.collapsed;
    });
  }

  cargarReporteGrupoCajas() {
    this.reporteService.buscarReporteGrupoCajas().subscribe((reporte) => {
      reporte.forEach((grupoCaja) => {
        grupoCaja.collapsed = true;
      });
      this.reporte = reporte;
    });
  }
}
