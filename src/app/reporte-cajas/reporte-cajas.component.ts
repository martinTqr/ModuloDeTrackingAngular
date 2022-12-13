import { Component, OnInit } from '@angular/core';
import { separarMiles } from '../helper';
import { GrupoCaja } from '../models';
import { CajaService } from '../services/caja.service';
import { GrupoCajaService } from '../services/grupo-caja.service';

@Component({
  selector: 'app-reporte-cajas',
  templateUrl: './reporte-cajas.component.html',
  styleUrls: ['./reporte-cajas.component.css'],
})
export class ReporteCajasComponent implements OnInit {
  grupoCajas: GrupoCaja[];
  menu: String = '';
  constructor(
    private cajaService: CajaService,
    private grupoCajaService: GrupoCajaService
  ) {}

  ngOnInit(): void {
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

  cargarCajas() {
    this.grupoCajaService.lista().subscribe(
      (grupoCajas) => {
        this.cajaService.listaConSaldo().subscribe(
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
            this.grupoCajas = grupoCajas;
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }
}
