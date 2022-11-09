import { Component, OnInit } from '@angular/core';
import { parsearFecha } from '../helper';
import { Categoria, Movimiento } from '../models';
import { CategoriaService } from '../services/categoria.service';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-lista-movimiento',
  templateUrl: './lista-movimiento.component.html',
  styleUrls: ['./lista-movimiento.component.css'],
})
export class ListaMovimientoComponent implements OnInit {
  movimientos: Movimiento[] = [];
  categorias: Categoria[] = [];
  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  cargarMovimientos() {
    this.movimientoService.lista().subscribe(
      ({ movimientos }) => (this.movimientos = movimientos),
      (error) => console.error(error)
    );
  }
  parsearFecha(fecha: Date): string {
    return parsearFecha(fecha);
  }
}
