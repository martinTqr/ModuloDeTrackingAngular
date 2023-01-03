import { Component, OnInit } from '@angular/core';
import { separarMiles } from '../helper';
import { GrupoCaja } from '../models';
import { ReporteService } from '../services/reporte.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { colores, filaResultado, meses } from '../helper/constantes';
@Component({
  selector: 'app-reporte-cajas',
  templateUrl: './reporte-cajas.component.html',
  styleUrls: ['./reporte-cajas.component.css'],
})
export class ReporteCajasComponent implements OnInit {
  reporte: GrupoCaja[];
  reporteAnual: any;
  menu: String = '';
  semanas: Array<any> = new Array(5);
  nombreDeMeses: string[] = meses;
  constructor(
    private reporteService: ReporteService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarReporteGrupoCajas();
  }

  cargarReporteGrupoCajas() {
    //get query params
    const { id } = this.rutaActiva.snapshot.queryParams;

    this.reporteService.buscarReporteGrupoCajas(id).subscribe((reporte) => {
      const grupos = reporte.map((categoria) => {
        return formatearObjeto(categoria);
      });
      console.log(reporte);

      grupos.forEach((grupoCaja) => {
        grupoCaja['collapsed'] = id ? false : true;
      });
      this.reporteAnual = grupos;

      if (grupos.length === 0)
        Swal.fire('No hay datos para mostrar', '', 'info');
    });
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
    if (evento.data?.nombre === filaResultado) {
      evento.rowElement.style.backgroundColor = 'rgb(154,154,154,0.32)';
    }
  }
  cambiarColorCelda(evento) {
    const { negativo, positivo } = colores;
    const { columnIndex, cellElement, data, displayValue } = evento;
    if (displayValue && columnIndex !== 0 && data?.nombre === filaResultado) {
      const color = displayValue >= 0 ? positivo : negativo;
      cellElement.style.backgroundColor = color;
      cellElement.style.color = 'white';
    }
  }
}
const formatearObjeto = (objeto: any) => {
  return {
    nombre: objeto.nombre,
    acumulado: objeto.acumulado,
    meses: objeto.meses,
    cajas:
      objeto?.cajas &&
      objeto.cajas.map((subcategoria) => {
        return formatearObjeto(subcategoria);
      }),
  };
};
