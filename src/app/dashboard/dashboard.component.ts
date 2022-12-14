import { Component, OnInit } from '@angular/core';
import { separarMiles } from '../helper';
import { Empresa, GrupoCaja } from '../models';
import { CajaService } from '../services/caja.service';
import { GrupoCajaService } from '../services/grupo-caja.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  empresa: Empresa;
  grupoCajas: GrupoCaja[];

  menu: string = '';
  constructor(
    private cajaService: CajaService,
    private localService: LocalService,
    private grupoCajaService: GrupoCajaService
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
