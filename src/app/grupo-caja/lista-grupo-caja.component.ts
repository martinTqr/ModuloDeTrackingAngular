import { Component, OnInit } from '@angular/core';
import { GrupoCaja } from '../models';
import { GrupoCajaService } from '../services/grupo-caja.service';

@Component({
  selector: 'app-lista-grupo-caja',
  templateUrl: './lista-grupo-caja.component.html',
  styleUrls: ['./lista-grupo-caja.component.css'],
})
export class ListaGrupoCajaComponent implements OnInit {
  grupoCajas: GrupoCaja[] = [];
  constructor(private grupoCajaService: GrupoCajaService) {}

  ngOnInit(): void {
    this.grupoCajaService
      .lista()
      .subscribe((grupoCajas) => (this.grupoCajas = grupoCajas));
  }
}
