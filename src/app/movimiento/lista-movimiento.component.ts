import { Component, OnInit } from '@angular/core';
import { Movimiento } from '../models';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-lista-movimiento',
  templateUrl: './lista-movimiento.component.html',
  styleUrls: ['./lista-movimiento.component.css'],
})
export class ListaMovimientoComponent implements OnInit {
  movimientos: Movimiento[] = [];
  constructor(private movimientoService: MovimientoService) {
    this.cargarMovimientos();
  }

  ngOnInit(): void {}
  cargarMovimientos() {
    this.movimientoService.lista().subscribe(
      ({ movimientos }) => (this.movimientos = movimientos),
      (error) => console.error(error)
    );
  }
}
