import { Component, OnInit } from '@angular/core';
import { Movimiento } from '../models';
import { MovimientoService } from '../services/movimiento.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { parsearFecha } from '../helper';
@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
  styleUrls: ['./detalle-movimiento.component.css'],
})
export class DetalleMovimientoComponent implements OnInit {
  movimiento!: Movimiento;
  constructor(
    private movimientoService: MovimientoService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buscarMovimiento();
  }
  buscarMovimiento() {
    const { id } = this.rutaActiva.snapshot.params;

    this.movimientoService.detalle(id).subscribe(
      (movimiento) => (this.movimiento = movimiento),
      ({ error }) =>
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        })
    );
  }
  parsearFecha(fecha: Date): string {
    return parsearFecha(fecha);
  }
}
