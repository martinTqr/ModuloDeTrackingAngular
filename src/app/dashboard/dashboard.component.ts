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
    this.cargarGrupoCajas();
    this.cargarCajas();
  }
  cargarGrupoCajas() {
    this.grupoCajaService.lista(this.empresa.id).subscribe(
      (grupoCajas) => (this.grupoCajas = grupoCajas),
      (error) => console.log(error)
    );
  }

  cargarCajas() {
    this.cajaService.lista().subscribe(
      (cajas) => {
        cajas.forEach((caja) => (caja['total'] = 0));
        this.grupoCajas.forEach((grupoCaja) => {
          const cajasFiltradas = cajas.filter(
            (caja) => caja.grupoCaja.id === grupoCaja.id
          );
          grupoCaja.cajas = cajasFiltradas;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
