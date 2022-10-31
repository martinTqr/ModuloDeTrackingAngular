import { Component, OnInit } from '@angular/core';
import { meses } from '../constantes/';
import { Reporte } from '../interfaces';
import { ReportesDeEmpresa } from './reporte-emp.interface';
import { ReporteEmpresaService } from './reporte-emp.service';

@Component({
  selector: 'reporte-emp',
  templateUrl: './reporte-emp.component.html',
  styleUrls: ['./reporte-emp.component.css'],
})
export class ReporteEmpComponent implements OnInit {
  reporte: ReportesDeEmpresa;
  cantidadDeSemanas: Array<any> = new Array(5);
  semanas: any = [];

  nombreDeMeses: string[] = meses;
  constructor(servicio: ReporteEmpresaService) {
    const reportes = servicio.buscarReporteEmpresa();
    const reportesConCajas = reportes.reportes.map((reporte: Reporte) => {
      const cajas = reporte.cajas.map((caja: any) => ({
        ...caja,
        acumulado: {
          total: caja.total,
        },
      }));
      this.semanas = reportes.reportes[0].subcategorias[0].meses;
      return {
        ...reporte,
        subcategorias: [...reporte.subcategorias, ...cajas],
      };
    });
    this.reporte = {
      categoriasGenerales: reportes.categoriasGenerales,
      reportes: reportes.reportes,
    };
  }
  ngOnInit(): void {}
}
