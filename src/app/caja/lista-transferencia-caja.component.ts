import { Component, OnInit } from '@angular/core';
import { parsearFecha, separarMiles } from '../helper';
import { Movimiento } from '../models';
import { CajaService } from '../services/caja.service';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-transferencia-caja-lista',
  templateUrl: './lista-transferencia-caja.component.html',
  styleUrls: ['./lista-transferencia-caja.component.css'],
})
export class ListaTransferenciaCajaListaComponent implements OnInit {
  movimientos: Movimiento[] = [];
  constructor(
    private movimientosService: MovimientoService,
    private cajaService: CajaService
  ) {}

  ngOnInit(): void {
    this.cargarTransferencias();
  }
  cargarTransferencias() {
    this.cajaService.listaConSaldo().subscribe((cajas) => {
      const idCajas = cajas.map((c) => c.id);

      this.movimientosService
        .trasnferenciasEntreCajas(idCajas)
        .subscribe((movimientos) => (this.movimientos = movimientos));
    });
  }
  parsearFecha(fecha: string, formato?: string): string {
    return parsearFecha(fecha, formato);
  }
  separarMiles(numero: number): string {
    return separarMiles(numero);
  }
}
