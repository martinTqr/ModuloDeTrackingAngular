import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { parsearFecha, separarMiles } from '../helper';
import { Caja, Categoria, Movimiento } from '../models';
import { CajaService } from '../services/caja.service';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-lista-movimiento',
  templateUrl: './lista-movimiento.component.html',
  styleUrls: ['./lista-movimiento.component.css'],
})
export class ListaMovimientoComponent implements OnInit {
  movimientosForm = this.fb.group({
    idCaja: [''],
    fechaInicio: [''],
    fechaFin: [''],
  });

  orden = {
    caja: '',
    fecha: '',
    categoria: '',
    monto: '',
    tipo: '',
  };
  movimientos: Movimiento[] = [];
  cajas: Caja[] = [];
  constructor(
    private movimientoService: MovimientoService,
    private fb: FormBuilder,
    private cajaService: CajaService
  ) {}

  ngOnInit(): void {
    this.cargarMovimientos();
    this.cargarCajas();
  }
  cargarCajas() {
    this.cajaService.lista().subscribe((cajas) => {
      this.cajas = cajas;
    });
  }
  filtrarMovimientos() {
    const { fechaInicio, fechaFin, idCaja } = this.movimientosForm.value;
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio!) : undefined;
    const fechaFinDate = fechaFin ? new Date(fechaFin!) : undefined;
    this.cargarMovimientos(fechaInicioDate, fechaFinDate, [idCaja]);
  }

  cargarMovimientos(fechaInicio?: Date, fechaFin?: Date, cajas?: any[]) {
    this.movimientoService
      .lista({ fechaInicio, fechaFin, idCajas: cajas })
      .subscribe(
        ({ movimientos }) =>
          (this.movimientos = movimientos.sort(
            (a: any, b: any) => b.id - a.id
          )),
        (error) => console.error(error)
      );
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

  parsearFecha(fecha: string, formato?: string): string {
    return parsearFecha(fecha, formato);
  }
  separarMiles(numero: number): string {
    return separarMiles(numero);
  }

  ordenarCampo(campo?: string) {
    if (this.orden[campo] === '') {
      this.movimientos.sort((a: any, b: any) => {
        if (campo === 'monto') return a.monto - b.monto;
        if (campo === 'tipo')
          return a.categoria.tipo.localeCompare(b.categoria.tipo);
        if (a[campo].nombre > b[campo].nombre) return 1;
        if (a[campo].nombre < b[campo].nombre) return -1;
        return 0;
      });
      this.orden[campo] = 'cambio';
    } else this.movimientos.sort().reverse();
  }
  ordenarMonto() {
    if (this.orden.monto === '') {
      this.movimientos.sort((a: any, b: any) => a.monto - b.monto);
      this.orden.monto = 'cambio';
    } else this.movimientos.sort().reverse();
  }
}
