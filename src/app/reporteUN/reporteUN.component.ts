import { Component, Input, OnInit } from '@angular/core';
import { Reporte } from './reporteUN.interaces';
import { ReporteUNService } from './reporteUN.service';
import { meses } from './constantes';

@Component({
  selector: 'reporte-un',
  templateUrl: './reporteUN.component.html',
  styleUrls: ['./reporteUN.component.css'],
  providers: [ReporteUNService],
})
export class ReporteUNComponent implements OnInit {
  reporte: Reporte;
  semanasEnero: boolean = true;
  categoriasIngreso: number | undefined;
  semanas: Array<any> = new Array(5);
  nombreDeMeses: string[] = meses;
  @Input() mode!: string;

  constructor(servicio: ReporteUNService) {
    const reporte = servicio.buscarReporteUnidadDeNegocio();
    const cajas = reporte.cajas.map((caja) => ({
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
