import { Component, OnInit } from '@angular/core';
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
  constructor(
    private cajaService: CajaService,
    private localService: LocalService,
    private grupoCajaService: GrupoCajaService
  ) {}

  ngOnInit(): void {
    this.empresa = this.localService.getData('empresa');
    this.cargarCajas();
  }
  cargarGrupoCajas() {
    this.grupoCajaService.lista(this.empresa.id).subscribe(
      (grupoCajas) => (this.grupoCajas = grupoCajas),
      (error) => console.log(error)
    );
  }

  cargarCajas() {
    this.grupoCajaService.lista(this.empresa.id).subscribe(
      (grupoCajas) => {
        this.cajaService.listaConSaldo().subscribe(
          (cajas) => {
            grupoCajas.forEach((grupoCaja) => {
              console.log(cajas);

              const cajasFiltradas = cajas.filter(
                (caja) => caja.grupoCaja.id === grupoCaja.id
              );
              console.log(cajasFiltradas);

              grupoCaja.cajas = cajasFiltradas;
              grupoCaja.acumulado = { total: 0 };
              grupoCaja.acumulado.total = cajasFiltradas.reduce(
                (acumulado, caja) => acumulado + caja.total,
                0
              );
            });
            console.log('Final', grupoCajas);

            this.grupoCajas = grupoCajas;
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }
}
