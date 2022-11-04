import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { NuevoMovimiento } from '../models';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-nuevo-movimiento',
  templateUrl: './nuevo-movimiento.component.html',
  styleUrls: ['./nuevo-movimiento.component.css'],
})
export class NuevoMovimientoComponent implements OnInit {
  idUsuario: number = 4;
  idCaja: any = 8;
  idUnidadNegocio: number = 9;
  idCategoria: number = 28;
  monto: number = 12312312;
  detalle: string = 'TQR noviembre';
  fecha: string = '03-11-2022';
  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {}

  crear(): void {
    const fecha = new Date(this.fecha).toISOString();

    const movimiento = new NuevoMovimiento({ ...this, fecha });
    this.movimientoService.crear(movimiento).subscribe(
      ({ mensaje }) =>
        swal({
          title: 'Movimiento creado',
          text: mensaje,
          icon: 'success',
        }),
      ({ error }) => console.error(error)
    );
  }
}
