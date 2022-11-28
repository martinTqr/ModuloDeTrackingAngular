import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { parsearFecha, separarMiles } from '../helper';
import { Categoria, Movimiento } from '../models';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-lista-movimiento',
  templateUrl: './lista-movimiento.component.html',
  styleUrls: ['./lista-movimiento.component.css'],
})
export class ListaMovimientoComponent implements OnInit {
  movimientosForm = this.fb.group({
    fechaInicio: [''],
    fechaFin: [''],
  });
  movimientos: Movimiento[] = [];
  categorias: Categoria[] = [];
  constructor(
    private movimientoService: MovimientoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarMovimientos();
  }

  /*filtrarMovimientos() {
    const { fechaInicio, fechaFin } = this.movimientosForm.value;
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio!) : undefined;
    const fechaFinDate = fechaFin ? new Date(fechaFin!) : undefined;
    console.log(!!fechaInicio, !!fechaFin);
    console.log(fechaInicioDate, fechaFinDate);

    this.movimientoService.cargarMovimientos().subscribe(
      ({ movimientos }) => (this.movimientos = movimientos),
      (error) => console.error(error)
    );
  } */

  cargarMovimientos(fechaInicio?: Date, fechaFin?: Date) {
    this.movimientoService.lista(fechaInicio, fechaFin).subscribe(
      ({ movimientos }) =>
        (this.movimientos = movimientos.sort((a: any, b: any) => b.id - a.id)),
      (error) => console.error(error)
    );
  }
  parsearFecha(fecha: string, formato?: string): string {
    return parsearFecha(fecha, formato);
  }
  separarMiles(numero: number): string {
    return separarMiles(numero);
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
