import { Component, OnInit } from '@angular/core';
import { separarMiles } from '../helper';
import { Empresa, GrupoCaja } from '../models';
import { CajaService } from '../services/caja.service';
import { GrupoCajaService } from '../services/grupo-caja.service';
import { LocalService } from '../services/local.service';
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'app-reporte-transferencia',
  templateUrl: './reporte-transferencia.component.html',
  styleUrls: ['./reporte-transferencia.component.css'],
})
export class ReporteTransferenciaComponent implements OnInit {
  empresa: Empresa;
  grupoCajas: GrupoCaja[];

  menu: string = '';
  constructor(
    private cajaService: CajaService,
    private localService: LocalService,
    private grupoCajaService: GrupoCajaService,
    private reporteService: ReporteService
  ) {}

  ngOnInit(): void {
    this.empresa = this.localService.getData('empresa');
    this.cargarCajas();
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
  cambiarColorFila(evento) {
    if (evento.data?.nombre === 'Saldo') {
      evento.rowElement.style.backgroundColor = 'rgb(154,154,154,0.32)';
    }
  }
  cambiarColorCelda(evento) {
    const { columnIndex, cellElement, data, displayValue } = evento;
    if (displayValue && columnIndex !== 0 && data?.nombre === 'Saldo') {
      const color = displayValue >= 0 ? '#00ad00' : 'red';
      cellElement.style.backgroundColor = color;
      cellElement.style.color = 'white';
    }
  }

  cargarCajas() {
    this.reporteService
      .buscarReporteUnidadNegocio({ transferencias: true })
      .subscribe((reporte) => {
        console.log(reporte[0]);

        const asd = reporte.subcategorias[0]['subcategorias'].map(
          (subcategoria) => {
            return formatearObjeto(subcategoria);
          }
        );
        console.log(asd);
      });
  }
}
const formatearObjeto = (objeto: any): any => {
  return {
    nombre: objeto.nombre,
    acumulado: objeto.acumulado || { total: objeto.total },
    collapsed: objeto.collapsed,
    meses: objeto?.meses,
    cajas:
      objeto?.cajas &&
      objeto.cajas.map((caja) => {
        return formatearObjeto(caja);
      }),
  };
};
/* const transferencia = true;
    this.grupoCajaService.lista().subscribe(
      (grupoCajas) => {
        this.cajaService.listaConSaldo(transferencia).subscribe(
          (cajas) => {
            grupoCajas.forEach((grupoCaja) => {
              grupoCaja.collapsed = true;
              const cajasFiltradas = cajas.filter(
                (caja) => caja.grupoCaja.id === grupoCaja.id
              );
              cajasFiltradas.forEach((caja) => {
                caja.total = Math.round(caja.total);
              });
              grupoCaja.cajas = cajasFiltradas;
              grupoCaja.acumulado = { total: 0 };
              grupoCaja.acumulado.total = cajasFiltradas.reduce(
                (acumulado, caja) => acumulado + caja.total,
                0
              );
            });
            const gruposParseados = grupoCajas.map((grupo) => {
              return formatearObjeto(grupo);
            });
            this.grupoCajas = gruposParseados;
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    ); */
