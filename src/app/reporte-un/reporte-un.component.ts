import { Component, OnInit } from '@angular/core';
import { Reporte } from '../interfaces/reporte.interaces';
import { ReporteService } from '../services/reporte.service';
import { ActivatedRoute } from '@angular/router';
import { GrupoCajaService } from '../services/grupo-caja.service';
import { acumularMesesTotales, agruparCajas } from '../helper';
import { Empresa, UnidadNegocio } from '../models';
import { colores, meses } from '../helper/constantes';
import { UnidadNegocioService } from '../services/unidad-negocio.service';

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
  unidad: UnidadNegocio;
  constructor(
    private reporteService: ReporteService,
    private grupoCajaService: GrupoCajaService,
    private rutaActiva: ActivatedRoute,
    private unidadService: UnidadNegocioService
  ) {}

  ngOnInit() {
    this.cargarReporte();
    this.cargarUnidad();
  }
  cargarUnidad() {
    const { id } = this.rutaActiva.snapshot.params;
    this.unidadService.buscarPorId(id).subscribe((unidad) => {
      this.unidad = unidad;
    });
  }
  cargarReporte() {
    this.grupoCajaService.lista().subscribe((grupoCajas) => {
      const { id } = this.rutaActiva.snapshot.params;
      const { fechaInicio, fechaFin } = this.rutaActiva.snapshot.queryParams;
      this.reporteService
        .buscarReporteUnidadNegocio({ id, fechaInicio, fechaFin })
        .subscribe((reporteUnidad: Reporte) => {
          const total = acumularMesesTotales(reporteUnidad);
          const gruposDeCajasAcumulados = agruparCajas(
            reporteUnidad.cajas,
            grupoCajas
          );
          const subcategorias = [
            ...reporteUnidad.subcategorias,
            total,
            ...gruposDeCajasAcumulados,
          ].map((categoria) => {
            return formatearObjeto(categoria);
          });
          const reporte = subcategorias;

          this.reporte = reporte;
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
  cambiarColorFila(evento) {
    if (evento.data?.nombre === 'Saldo') {
      evento.rowElement.style.backgroundColor = 'rgb(154,154,154,0.32)';
    }
  }
  cambiarColorCelda(evento) {
    const { negativo, positivo } = colores;
    const { columnIndex, cellElement, data, displayValue } = evento;
    if (displayValue && columnIndex !== 0 && data?.nombre === 'Saldo') {
      const color = displayValue >= 0 ? positivo : negativo;
      cellElement.style.backgroundColor = color;
      cellElement.style.color = 'white';
    }
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
