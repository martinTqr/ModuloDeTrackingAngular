import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  transferencias: Movimiento[] = [];
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
        .subscribe((transferencias) => {
          this.transferencias = transferencias;
        });
    });
  }

  cambiarEstiloFila(transferencia: Movimiento) {
    return {
      union_transferencia: transferencia.id % 2 === 1,
    };
  }

  parsearFecha(fecha: string, formato?: string): string {
    return parsearFecha(fecha, formato);
  }
  separarMiles(numero: number): string {
    return separarMiles(numero);
  }
  borrar(evento: any) {
    const { id } = evento.data;
    this.movimientosService.borrar(id).subscribe(({ mensaje }) => {
      if (mensaje)
        this.movimientosService.borrar(id + 1).subscribe((data) => {
          this.transferencias = this.transferencias.filter(
            (t) => t.id !== id && t.id !== id + 1
          );
          Swal.fire('Borrado', mensaje, 'success');
        });
    });
  }
}
