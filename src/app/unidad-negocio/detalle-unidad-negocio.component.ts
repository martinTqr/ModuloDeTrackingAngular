import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UnidadNegocio } from '../models';
import { UnidadNegocioService } from '../services/unidad-negocio.service';

@Component({
  selector: 'app-detalle-unidad-negocio',
  templateUrl: './detalle-unidad-negocio.component.html',
  styleUrls: ['./detalle-unidad-negocio.component.css'],
})
export class DetalleUnidadNegocioComponent implements OnInit {
  unidadNegocio!: UnidadNegocio;
  constructor(
    private unidadNegocioService: UnidadNegocioService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscarUnidadNegocio();
  }
  buscarUnidadNegocio() {
    const { id } = this.rutaActiva.snapshot.params;

    this.unidadNegocioService.detalle(id).subscribe(
      (unidadNegocio) => (this.unidadNegocio = unidadNegocio),
      ({ error }) =>
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        })
    );
  }
}
