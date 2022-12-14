import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  obtenerCambios,
  parsearFecha,
  parsearObjeto,
  separarMiles,
} from '../helper';
import { recargarPagina } from '../helper/genreales';
import { Caja, Categoria, Movimiento, TipoCategoria } from '../models';
import { CajaService } from '../services/caja.service';
import { CategoriaService } from '../services/categoria.service';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-lista-movimiento',
  templateUrl: './lista-movimiento.component.html',
  styleUrls: ['./lista-movimiento.component.css'],
})
export class ListaMovimientoComponent implements OnInit {
  movimientosForm = this.fb.group({
    tipo: [''],
    idCaja: [''],
    fechaInicio: [''],
    fechaFin: [''],
  });
  movimientoPorEditar: Movimiento;

  categorias: any[] = [];
  movimientos: Movimiento[] = [];
  cajas: Caja[] = [];
  tipo = [
    {
      id: 'in',
      nombre: 'Ingreso',
    },
    {
      id: 'out',
      nombre: 'Egreso',
    },
  ];
  constructor(
    private movimientoService: MovimientoService,
    private fb: FormBuilder,
    private cajaService: CajaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarMovimientos();
    this.cargarCajas();
    this.cargarCategorias();
  }
  cargarCategorias() {
    this.categoriaService.lista().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }
  cargarCajas() {
    this.cajaService.lista().subscribe((cajas) => {
      this.cajas = cajas;
    });
  }
  mostrarCategoria(movimiento: any) {
    return movimiento.categoria.nombre;
  }
  mostrarCaja(movimiento: any) {
    return movimiento.caja.nombre;
  }
  preparacionDeEdicion(evento) {
    this.movimientoPorEditar = parsearObjeto(evento.data);
  }

  filtrarMovimientos() {
    const { fechaInicio, fechaFin, idCaja, tipo } = this.movimientosForm.value;
    const fechaInicioDate = fechaInicio ? new Date(fechaInicio!) : undefined;
    const fechaFinDate = fechaFin ? new Date(fechaFin!) : undefined;
    const tipoParseado = tipo ? tipo.replace(/'/g, '') : undefined;
    this.cargarMovimientos(
      fechaInicioDate,
      fechaFinDate,
      [idCaja],
      TipoCategoria[tipoParseado]
    );
  }

  cargarMovimientos(
    fechaInicio?: Date,
    fechaFin?: Date,
    cajas?: any[],
    tipo?: TipoCategoria
  ) {
    this.movimientoService
      .lista({ fechaInicio, fechaFin, idCajas: cajas, tipo: tipo })
      .subscribe({
        next: ({ movimientos }) => {
          const movimientosOrdenados = movimientos.sort(
            (a: any, b: any) => b.id - a.id
          );
          this.movimientos = movimientosOrdenados.map((movimiento) => ({
            ...movimiento,
            fecha: parsearFecha(movimiento.fecha),
          }));
        },
        error: (error) => console.error(error),
      });
  }
  guardado(evento) {
    if (evento?.changes[0].type === 'update') {
      const cambios = evento.changes;

      if (cambios.length > 0) {
        const movimiento = cambios[0].data;

        if (this.movimientoPorEditar.caja.id !== movimiento.caja.id) {
          const caja = this.cajas.find(
            (caja) => caja.id === movimiento.caja.id
          );
          movimiento.caja = caja;
        }

        if (this.movimientoPorEditar.categoria.id !== movimiento.categoria.id) {
          const categoria = this.categorias.find(
            (categoria) => categoria.id === movimiento.categoria.id
          );
          movimiento.categoria = categoria;
        }

        this.movimientoService
          .modificar(this.movimientoPorEditar.id, movimiento)
          .subscribe({
            next: (data) => {
              Swal.fire({
                title: data.mensaje.toUpperCase() + '!',
                text: `Movimiento actualizado con ??xito`,
                icon: 'success',
                timer: 2500,
                timerProgressBar: true,
              }).then(() => {
                recargarPagina();
              });
            },
            error: ({ error }) => {
              Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
              });
              this.movimientos = this.movimientos.map((movimiento) => {
                if (movimiento.id === this.movimientoPorEditar.id) {
                  return this.movimientoPorEditar;
                }
                return movimiento;
              });
            },
          });
      }
    }
  }
  borrar(evento: any): void {
    const { id } = evento.data;
    this.movimientoService.borrar(id).subscribe(
      () => {
        this.movimientos = this.movimientos.filter(
          (movimiento) => movimiento.id !== id
        );
        Swal.fire(
          'Movimiento borrado',
          `Movimiento ${id} eliminado con ??xito`,
          'success'
        );
      },

      ({ error }) => {
        const movimiento = evento.data;
        //Put the movimiento in the same position
        const movimientosOrdenados = [movimiento, ...this.movimientos].sort(
          (a: any, b: any) => b.id - a.id
        );
        this.movimientos = movimientosOrdenados;
        Swal.fire('Error!', error.mensaje || error.message, 'error');
      }
    );
  }

  separarMiles(evento: any): string {
    return separarMiles(Number(evento.value));
  }
  mostrarTipo(evento) {
    return evento.value === 'Ingreso' ? 'Ingreso' : 'Egreso';
  }
  filtrarTipo(tipo: string) {
    let tipoForm = this.movimientosForm.get('tipo').value;
    if (tipoForm) {
      tipoForm = tipoForm.replace(/'/g, '');
      return tipoForm == tipo;
    }
    return true;
  }
}
