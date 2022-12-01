import { Component, OnInit } from '@angular/core';
import { CajaService } from '../services/caja.service';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-transferencia-caja-lista',
  templateUrl: './lista-transferencia-caja.component.html',
  styleUrls: ['./lista-transferencia-caja.component.css'],
})
export class ListaTransferenciaCajaListaComponent implements OnInit {
  cajas;
  constructor(
    private movimientosService: MovimientoService,
    private cajaService: CajaService
  ) {}

  ngOnInit(): void {
    this.cargarTransferencias();
    this.movimientosService;
  }
  cargarTransferencias() {
    this.cajaService.listaConSaldo().subscribe((cajas) => {
      const idCajas = cajas.map((c) => c.id);

      this.movimientosService
        .trasnferenciasEntreCajas(idCajas)
        .subscribe((movimientos) => {
          console.log(movimientos);
        });
    });
  }
}
