import { Component, OnInit } from '@angular/core';
import { UnidadNegocio } from '../models';
import { UnidadNegocioService } from '../services/unidad-negocio.service';

@Component({
  selector: 'app-lista-unidad-negocio',
  templateUrl: './lista-unidad-negocio.component.html',
  styleUrls: ['./lista-unidad-negocio.component.css'],
})
export class ListaUnidadNegocioComponent implements OnInit {
  listaUnidadesDeNegocio: UnidadNegocio[] = [];
  constructor(private unidadNegocioService: UnidadNegocioService) {}

  ngOnInit(): void {
    this.cargarUnidadesDeNegocio();
  }

  cargarUnidadesDeNegocio() {
    this.unidadNegocioService
      .lista()
      .subscribe(
        (unidadesDeNegocio) => (this.listaUnidadesDeNegocio = unidadesDeNegocio)
      );
  }
}
