import { Component, Input, OnInit } from '@angular/core';
import { Caja, Reporte } from './reporte-un.interaces';
import { meses } from './constantes';
import { ReporteUNService } from './reporte-un.service';

@Component({
  selector: 'reporte-un',
  templateUrl: './reporte-un.component.html',
  styleUrls: ['./reporte-un.component.css'],
  providers: [ReporteUNService],
})
export class ReporteUNComponent implements OnInit {
  reporte: Reporte;
  categoriasIngreso: number | undefined;
  semanas: Array<any> = new Array(5);
  nombreDeMeses: string[] = meses;

  constructor(servicio: ReporteUNService) {
    const reporte = servicio.buscarReporteUnidadDeNegocio();
    const cajas = reporte.cajas.map((caja: Caja) => ({
      ...caja,
      acumulado: {
        total: caja.total,
      },
    }));
    this.reporte = {
      ...reporte,
      subcategorias: [...reporte.subcategorias, ...cajas],
    };
  }

  ngOnInit(): void {}

  onCellClick(e: any) {
    meses.forEach((mes: string) => {
      if (e.rowType === 'header' && e.column.caption === mes) {
        e.component.columnOption(
          `Semanas de ${mes}`,
          'visible',
          !e.component.columnOption(`Semanas de ${mes}`).visible
        ); // Hide 'Semanas'
      }
    });
  }
}
