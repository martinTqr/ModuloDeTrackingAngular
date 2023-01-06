import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { obtenerCambios, parsearFecha, parsearObjeto } from '../helper';
import { Cotizacion } from '../models';
import { CotizacionService } from '../services/cotizacion.service';

@Component({
  selector: 'app-lista-cotizacion',
  templateUrl: './lista-cotizacion.component.html',
  styleUrls: ['./lista-cotizacion.component.css'],
})
export class ListaCotizacionComponent implements OnInit {
  cotizaciones: Cotizacion[];
  cotizacionPorEditar: Cotizacion;
  constructor(private cotizacionService: CotizacionService) {}

  ngOnInit(): void {
    this.cargarCotizaciones();
  }
  cargarCotizaciones() {
    this.cotizacionService.lista().subscribe((cotizaciones) => {
      cotizaciones.forEach((cotizacion) => {
        cotizacion.fecha = parsearFecha(String(cotizacion.fecha));
      });
      this.cotizaciones = cotizaciones;
      console.log(cotizaciones);
    });
  }
  preparacionDeEdicion(evento) {
    this.cotizacionPorEditar = parsearObjeto(evento.data);
  }
  guardado(evento) {
    if (evento?.changes[0].type === 'update') {
      const cambios = evento.changes;

      if (cambios.length > 0) {
        const cotizacion = cambios[0].data;
        const diferencia: any = obtenerCambios({
          original: this.cotizacionPorEditar,
          modificado: cotizacion,
        });
        if (diferencia?.valor) diferencia.valor = Number(diferencia.valor);

        this.cotizacionService.modificar(cotizacion.id, diferencia).subscribe(
          (data) => {
            Swal.fire({
              title: data.mensaje + '!',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
            });
          },
          ({ error }) => {
            Swal.fire('Error!', error.message, 'error');
            this.cotizaciones = this.cotizaciones.map((cotizacion) => {
              if (cotizacion.id === this.cotizacionPorEditar.id) {
                return this.cotizacionPorEditar;
              }
              return cotizacion;
            });
          }
        );
      }
    }
  }
  borrar(evento: any): void {
    const { id } = evento.data;
    this.cotizacionService.borrar(id).subscribe(
      () => {
        this.cotizaciones = this.cotizaciones.filter(
          (cotizacion) => cotizacion.id !== id
        );
        Swal.fire(
          'Cotizacion borrada',
          `Cotizacion ${id} eliminada con éxito`,
          'success'
        );
      },
      ({ error }) => {
        console.log(error);

        const mensajeError = error?.cotizacions
          ? error.mensaje +
            ': ' +
            error.cotizacions.map((c: any) => c.nombre).join(', ')
          : error.mensaje;
        Swal.fire('Error!', mensajeError, 'error');
      }
    );
  }
}
