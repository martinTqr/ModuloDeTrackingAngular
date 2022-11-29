import { Component, OnInit } from '@angular/core';
import { Reporte } from '../interfaces/reporte.interaces';
import { meses } from '../constantes';
import { ReporteService } from '../services/reporte.service';
import { ActivatedRoute } from '@angular/router';
import { GrupoCajaService } from '../services/grupo-caja.service';
import { acumularMesesTotales, agruparCajas } from '../helper';
import { Empresa } from '../models';

@Component({
  selector: 'reporte-un',
  templateUrl: './reporte-un.component.html',
  styleUrls: ['./reporte-un.component.css'],
})
export class ReporteUNComponent implements OnInit {
  empresa: Empresa;
  reporte: any = [];
  semanas: Array<any> = new Array(5);
  nombreDeMeses: string[] = meses;

  constructor(
    private reporteService: ReporteService,
    private grupoCajaService: GrupoCajaService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarReporte();
  }
  cargarReporte() {
    this.grupoCajaService.lista().subscribe((grupoCajas) => {
      const { id } = this.rutaActiva.snapshot.params;
      const { fechaInicio, fechaFin } = this.rutaActiva.snapshot.queryParams;
      this.reporteService
        .buscarReporteUnidadNegocio(id, fechaInicio, fechaFin)
        .subscribe((data: Reporte) => {
          const total = acumularMesesTotales(data);
          const gruposDeCajasAcumulados = agruparCajas(data.cajas, grupoCajas);
          const subcategorias = [
            ...data.subcategorias,
            total,
            ...gruposDeCajasAcumulados,
          ].map((categoria) => {
            return formatearObjeto(categoria);
          });
          const reporte = subcategorias;

          this.reporte = reporte;
          console.log(reporte);
        });
    });
  }
  mostrarColumnaSemanasPorMes(e: any) {
    meses.forEach((mes: string) => {
      if (e.rowType === 'header' && e.column.caption === mes) {
        e.component.columnOption(
          `Semanas de ${mes}`,
          'visible',
          !e.component.columnOption(`Semanas de ${mes}`).visible
        );
      }
    });
  }
}
/* nombre
acumulado.total
meses */
const formatearObjeto = (objeto: any): any => {
  return {
    nombre: objeto.nombre,
    acumulado: objeto.acumulado,
    meses: objeto.meses,
    subcategorias:
      objeto?.subcategorias &&
      objeto.subcategorias.map((subcategoria) => {
        return formatearObjeto(subcategoria);
      }),
  };
};
