import { Component, OnInit } from '@angular/core';
import { Movimiento } from '../models';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
  styleUrls: ['./detalle-movimiento.component.css'],
})
export class DetalleMovimientoComponent implements OnInit {
  movimiento!: Movimiento;
  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.movimientoService.detalle(12).subscribe(
      (movimiento) => (this.movimiento = movimiento),
      ({ error }) => console.error(error)
    );
  }
}
