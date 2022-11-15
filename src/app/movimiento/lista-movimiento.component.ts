import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { parsearFecha } from '../helper';
import { Categoria, Movimiento } from '../models';
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
      ({ movimientos }) =>
        (this.movimientos = movimientos.sort((a: any, b: any) => a.id - b.id)),
      (error) => console.error(error)
    );
  }
  parsearFecha(fecha: Date): string {
    return parsearFecha(fecha);
  }
  borrar(id: any): void {
    this.movimientoService.borrar(id).subscribe(
      () => {
        this.movimientos = this.movimientos.filter(
          (movimiento) => movimiento.id !== id
        );
        Swal.fire(
          'Movimiento borrado',
          `Movimiento ${id} eliminado con éxito`,
          'success'
        );
      },

      ({ error }) => {
        Swal.fire('Error!', error.mensaje || error.message, 'error');
      }
    );
  }
}
