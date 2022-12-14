import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { obtenerCambios, parsearObjeto } from '../helper';
import { redireccionar } from '../helper/genreales';
import { GrupoCaja } from '../models';
import { GrupoCajaService } from '../services/grupo-caja.service';

@Component({
  selector: 'app-lista-grupo-caja',
  templateUrl: './lista-grupo-caja.component.html',
  styleUrls: ['./lista-grupo-caja.component.css'],
})
export class ListaGrupoCajaComponent implements OnInit {
  grupoCajas: GrupoCaja[] = [];
  grupoPorEditar: GrupoCaja;
  constructor(private grupoCajaService: GrupoCajaService) {}

  ngOnInit(): void {
    this.cargarGrupos();
  }
  cargarGrupos() {
    this.grupoCajaService
      .lista()
      .subscribe((grupoCajas) => (this.grupoCajas = grupoCajas));
  }
  preparacionDeEdicion(evento) {
    this.grupoPorEditar = parsearObjeto(evento.data);
  }
  seleccionar(evento) {
    const { id } = evento.data;
    !this.grupoPorEditar && redireccionar(`reporte/grupo-cajas?id=${id}`);
  }

  onCellPrepared(e) {
    if (e.rowType == 'data' && e.column && e.column.dataField == 'nombre') {
      const elem = e.cellElement;
      elem.style.setProperty('cursor', 'pointer', 'important');
    }
  }
  cancelarEdicion() {
    this.grupoPorEditar = null;
  }
  guardado(evento) {
    const cambios = evento.changes;

    if (cambios.length > 0 && cambios[0].type === 'update') {
      const grupo = cambios[0].data;

      this.grupoCajaService.modificar(this.grupoPorEditar.id, grupo).subscribe({
        next: (data) => {
          console.log(data);

          Swal.fire({
            title: data.mensaje.toUpperCase() + '!',
            text: `Grupo de cajas ${data.data.nombre} actualizada con éxito`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
        },
        error: ({ error }) => {
          Swal.fire('Error!', error.message, 'error');
        },
      });
      this.cancelarEdicion();
    }
  }
  cancelDelete(e) {
    e.cancel = true;
  }
  borrar(event): void {
    const { id } = event.data;
    try {
      this.grupoCajaService.borrar(id).subscribe(
        () => {
          this.grupoCajas = this.grupoCajas.filter((caja) => caja.id !== id);
          Swal.fire(
            'Caja borrada',
            `Caja ${id} eliminada con éxito`,
            'success'
          );
        },
        ({ error }) => {
          Swal.fire('Error!', error.message, 'error');
        }
      );
    } catch (err) {}

    this.cancelDelete(event);
  }
}
