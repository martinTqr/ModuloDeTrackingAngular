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
  categ = [
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
      this.categorias = categorias.map((categ) => ({
        id: categ.id,
        nombre: categ.nombre,
      }));
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
  parsearFecha(movimiento: any) {
    console.log(movimiento.fecha);

    return parsearFecha(movimiento.fecha);
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
        next: ({ movimientos }) =>
          (this.movimientos = movimientos.sort(
            (a: any, b: any) => b.id - a.id
          )),
        error: (error) => console.error(error),
      });
  }
  guardado(evento) {
    if (evento?.changes[0].type === 'update') {
      const cambios = evento.changes;

      if (cambios.length > 0) {
        const movimiento = cambios[0].data;
        const diferencia: any = obtenerCambios({
          original: this.movimientoPorEditar,
          modificado: movimiento,
        });
        if (this.movimientoPorEditar.caja.id !== movimiento.caja.id) {
          const caja = this.cajas.find(
            (caja) => caja.id === movimiento.caja.id
          );
          diferencia.caja = caja;
        } else delete diferencia.caja;

        if (this.movimientoPorEditar.categoria.id !== movimiento.categoria.id) {
          const categoria = this.categorias.find(
            (categoria) => categoria.id === movimiento.categoria.id
          );
          diferencia.categoria = categoria;
        } else delete diferencia.categoria;

        delete diferencia.usuario;

        this.movimientoService
          .modificar(this.movimientoPorEditar.id, diferencia)
          .subscribe(
            (data) => {
              Swal.fire({
                title: data.mensaje.toUpperCase() + '!',
                text: `Movimiento actualizado con éxito`,
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
              }).then(() => {
                if (diferencia?.categoria) recargarPagina();
              });
            },
            (err) => console.error(err)
          );
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
          `Movimiento ${id} eliminado con éxito`,
          'success'
        );
      },

      ({ error }) => {
        Swal.fire('Error!', error.mensaje || error.message, 'error');
      }
    );
  }

  separarMiles(evento: any): string {
    return separarMiles(Number(evento.value));
  }
  mostrarTipo(evento) {
    return evento.value === 'in' ? 'Ingreso' : 'Egreso';
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
