import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  borrar(id: any): void {
    this.unidadNegocioService.borrar(id).subscribe(
      () => {
        this.listaUnidadesDeNegocio = this.listaUnidadesDeNegocio.filter(
          (unidad) => unidad.id !== id
        );
        Swal.fire(
          'Unidad de negocio borrada',
          `Unidad de negocio ${id} eliminada con éxito`,
          'success'
        );
      },
      (error) => {
        Swal.fire(
          'Error!',
          'No se puede borrar una unidad de negocio con movimientos',
          'error'
        );
      }
    );
  }
}
