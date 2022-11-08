import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CajaService } from '../services/caja.service';
import swal from 'sweetalert2';
import { Caja } from '../models';
@Component({
  selector: 'app-detalle-caja',
  templateUrl: './detalle-caja.component.html',
  styleUrls: ['./detalle-caja.component.css'],
})
export class DetalleCajaComponent implements OnInit {
  caja!: Caja;
  constructor(
    private cajaService: CajaService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { id } = this.rutaActiva.snapshot.params;

    this.cajaService.detalle(id).subscribe(
      (caja) => (this.caja = caja),
      ({ error }) =>
        swal.fire({
          title: 'Error',
          text: error.mensaje,
          icon: 'error',
        })
    );
  }
}
