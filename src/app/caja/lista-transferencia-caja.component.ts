import { Component, OnInit } from '@angular/core';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-transferencia-caja-lista',
  templateUrl: './lista-transferencia-caja.component.html',
  styleUrls: ['./lista-transferencia-caja.component.css'],
})
export class ListaTransferenciaCajaListaComponent implements OnInit {
  constructor(private movimientosService: MovimientoService) {}

  ngOnInit(): void {
    this.cargarTransferencias();
  }
  cargarTransferencias() {
    this.movimientosService
      .lista({ transferecia: true })
      .subscribe((movimientos) => {
        console.log(movimientos);
      });
  }
}
