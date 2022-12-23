import { Component, OnInit } from '@angular/core';
import { separarMiles } from '../helper';
import { GrupoCaja } from '../models';
import { ReporteService } from '../services/reporte.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reporte-cajas',
  templateUrl: './reporte-cajas.component.html',
  styleUrls: ['./reporte-cajas.component.css'],
})
export class ReporteCajasComponent implements OnInit {
  reporte: GrupoCaja[];
  menu: String = '';
  constructor(
    private reporteService: ReporteService,
    private rutaActiva: ActivatedRoute
  ) {}

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
    //get query params
    const { id } = this.rutaActiva.snapshot.queryParams;

    this.reporteService.buscarReporteGrupoCajas(id).subscribe((reporte) => {
      reporte.forEach((grupoCaja) => {
        grupoCaja.collapsed = id ? false : true;
      });

      this.reporte = reporte;
      if (reporte.length === 0)
        Swal.fire('No hay datos para mostrar', '', 'info');
    });
  }
}
