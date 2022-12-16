import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { obtenerCambios, parsearObjeto } from '../helper';
import { UnidadNegocio } from '../models';
import { UnidadNegocioService } from '../services/unidad-negocio.service';

@Component({
  selector: 'app-lista-unidad-negocio',
  templateUrl: './lista-unidad-negocio.component.html',
  styleUrls: ['./lista-unidad-negocio.component.css'],
})
export class ListaUnidadNegocioComponent implements OnInit {
  unidadesNegocio: UnidadNegocio[] = [];
  unidadPorEditar: UnidadNegocio;
  constructor(private unidadNegocioService: UnidadNegocioService) {}

  ngOnInit(): void {
    this.cargarUnidadesDeNegocio();
  }

  cargarUnidadesDeNegocio() {
    this.unidadNegocioService
      .lista()
      .subscribe(
        (unidadesDeNegocio) => (this.unidadesNegocio = unidadesDeNegocio)
      );
  }
  preparacionDeEdicion(evento) {
    this.unidadPorEditar = parsearObjeto(evento.data);
  }
  guardado(evento) {
    const cambios = evento.changes;

    if (cambios.length > 0 && cambios[0].type === 'update') {
      const grupo = cambios[0].data;
      const diferencia: any = obtenerCambios({
        original: this.unidadPorEditar,
        modificado: grupo,
      });

      this.unidadNegocioService
        .modificar(this.unidadPorEditar.id, diferencia)
        .subscribe(
          (data) => {
            console.log(data);

            Swal.fire({
              title: data.mensaje.toUpperCase() + '!',
              text: `Unidad de negocio ${data.data.nombre} actualizada con éxito`,
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
            });
          },
          (err) => console.error(err)
        );
    }
  }
  cancelDelete(e) {
    e.cancel = true;
  }
  borrar(evento: any): void {
    const { id } = evento.data;
    try {
      this.unidadNegocioService.borrar(id).subscribe(
        () => {
          this.unidadesNegocio = this.unidadesNegocio.filter(
            (unidad) => unidad.id !== id
          );
          Swal.fire(
            'Unidad de negocio borrada',
            `Unidad de negocio ${id} eliminada con éxito`,
            'success'
          );
        },
        ({ error }) => {
          console.log(error);
          Swal.fire('Error!', error.message, 'error');
        }
      );
    } catch (error) {}
    this.cancelDelete(evento);
  }
}
