import { Component, OnInit } from '@angular/core';
import { Caja, Reporte } from '../interfaces/reporte.interaces';
import { meses } from '../constantes';
import { ReporteService } from '../services/reporte.service';
import { ActivatedRoute } from '@angular/router';
import { GrupoCajaService } from '../services/grupo-caja.service';
import { GrupoCaja } from '../models';
import { mesesVacios, parsearObjeto } from '../helper';

@Component({
  selector: 'reporte-un',
  templateUrl: './reporte-un.component.html',
  styleUrls: ['./reporte-un.component.css'],
})
export class ReporteUNComponent implements OnInit {
  reporte!: any;
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
  async cargarReporte() {
    await this.grupoCajaService.lista().subscribe((grupoCajas) => {
      const { id } = this.rutaActiva.snapshot.params;
      const { fechaInicio, fechaFin } = this.rutaActiva.snapshot.queryParams;
      this.reporteService
        .buscarReporteUnidadNegocio(id, fechaInicio, fechaFin)
        .subscribe((data: Reporte) => {
          const cajas = data.cajas.map((caja: Caja) => ({
            ...caja,
            acumulado: {
              total: caja.total,
            },
          }));
          //acumular cajas en los grupos de cajas y acumular totales

          const gruposCajas = grupoCajas.map((grupoCaja: GrupoCaja) => ({
            ...grupoCaja,
            subcategorias: cajas.filter(
              (caja: Caja) => caja.grupoCaja.id === grupoCaja.id
            ),
            meses: parsearObjeto(mesesVacios),
            acumulado: {
              total: 0,
              cajas: [],
            },
          }));

          gruposCajas.forEach((grupoCaja: GrupoCaja) => {
            grupoCaja.acumulado!.total = grupoCaja.acumulado!.cajas.reduce(
              (total: number, caja: Caja) => total + caja.total,
              0
            );
            grupoCaja.subcategorias.forEach((subcategoria: Caja) => {
              grupoCaja.meses = acumularMeses({
                acumulador: grupoCaja.meses,
                meses: subcategoria.meses,
              });
            });
          });

          const reporte = {
            ...data,
            subcategorias: [...data.subcategorias, ...gruposCajas],
          };

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
}
const acumularMeses = ({ acumulador, meses, suma = true }) => {
  const suma_resta = suma ? 1 : -1;
  return acumulador.map((mes, numeroMes) => ({
    ...mes,
    total: mes.total + meses[numeroMes].total * suma_resta,
    semanas: mes.semanas.map((semana, numeroSemana) => ({
      ...semana,
      total:
        semana.total +
        meses[numeroMes].semanas[numeroSemana].total * suma_resta,
    })),
  }));
};
