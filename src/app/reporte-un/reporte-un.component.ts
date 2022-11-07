import { Component, OnInit } from '@angular/core';
import { Caja, Reporte } from '../interfaces/reporte.interaces';
import { meses } from '../constantes';
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'reporte-un',
  templateUrl: './reporte-un.component.html',
  styleUrls: ['./reporte-un.component.css'],
})
export class ReporteUNComponent implements OnInit {
  reporte!: Reporte;
  semanas: Array<any> = new Array(5);
  nombreDeMeses: string[] = meses;

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.reporteService
      .buscarReporteUnidadNegocio(9)
      .subscribe((data: Reporte) => {
        const cajas = data.cajas.map((caja: Caja) => ({
          ...caja,
          acumulado: {
            total: caja.total,
          },
        }));
        const reporte = {
          ...data,
          subcategorias: [...data.subcategorias, ...cajas],
        };

        this.reporte = reporte;
      });
  }

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
