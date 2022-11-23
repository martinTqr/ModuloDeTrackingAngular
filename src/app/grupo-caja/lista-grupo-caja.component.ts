import { Component, OnInit } from '@angular/core';
import { Empresa, GrupoCaja } from '../models';
import { GrupoCajaService } from '../services/grupo-caja.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-lista-grupo-caja',
  templateUrl: './lista-grupo-caja.component.html',
  styleUrls: ['./lista-grupo-caja.component.css'],
})
export class ListaGrupoCajaComponent implements OnInit {
  empresa: Empresa;
  grupoCajas: GrupoCaja[] = [];
  constructor(
    private grupoCajaService: GrupoCajaService,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
    this.empresa = this.localService.getData('empresa');
    this.grupoCajaService
      .lista(this.empresa.id)
      .subscribe((grupoCajas) => (this.grupoCajas = grupoCajas));
  }
}
