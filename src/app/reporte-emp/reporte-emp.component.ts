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
    const reporte = servicio.buscarReporteEmpresa();
    const reportesConCajas = reporte.reportes.map((reporte: Reporte) => {
      const cajas = reporte.cajas.map((caja: any) => ({
        ...caja,
        acumulado: {
          total: caja.total,
        },
      }));

      return {
        ...reporte,
        subcategorias: [...reporte.subcategorias, ...cajas],
      };
    });
    this.reporte = {
      categoriasGenerales: reporte.categoriasGenerales,
      reportes: reportesConCajas,
    };
    this.semanas = reporte.reportes[0].subcategorias[0].meses;
  }
  ngOnInit(): void {}
}
