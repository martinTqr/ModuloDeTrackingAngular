import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { obtenerCambios, parsearObjeto } from '../helper';
import { Caja, GrupoCaja } from '../models';
import { CajaService } from '../services/caja.service';
import { GrupoCajaService } from '../services/grupo-caja.service';

@Component({
  selector: 'app-lista-cajas',
  templateUrl: './lista-cajas.component.html',
  styleUrls: ['./lista-cajas.component.css'],
})
export class ListaCajasComponent implements OnInit {
  cajas: Caja[] = [];
  cajaPorEditar: Caja;
  grupoCajas: GrupoCaja[] = [];
  tipo = [
    {
      valor: true,
      nombre: 'Si',
    },
    {
      valor: false,
      nombre: 'No',
    },
  ];
  constructor(
    private cajaService: CajaService,
    private grupoCajaServe: GrupoCajaService
  ) {}

  ngOnInit(): void {
    this.cargarCajas();
    this.cargarGrupopCajas();
  }
  cargarCajas() {
    this.cajaService.lista().subscribe(
      (cajas) => {
        this.cajas = cajas.sort((a, b) =>
          a.grupoCaja.nombre.localeCompare(b.grupoCaja.nombre)
        );
        this.cajas = cajas;
      },
      (error) => console.error(error)
    );
  }
  cargarGrupopCajas() {
    this.grupoCajaServe.lista().subscribe((grupos) => {
      this.grupoCajas = grupos;
    });
  }
  preparacionDeEdicion(evento) {
    this.cajaPorEditar = parsearObjeto(evento.data);
  }
  guardado(evento) {
    const cambios = evento.changes;

    if (cambios.length > 0 && cambios[0].type === 'update') {
      const caja = cambios[0].data;
      const diferencia: any = obtenerCambios({
        original: this.cajaPorEditar,
        modificado: caja,
      });
      if (this.cajaPorEditar.grupoCaja.id !== caja.grupoCaja.id) {
        const grupoCaja = this.grupoCajas.find(
          (grupo) => grupo.id === caja.grupoCaja.id
        );
        diferencia.grupoCaja = grupoCaja;
      }

      this.cajaService.modificar({ id: caja.id, caja: diferencia }).subscribe(
        (data) => {
          console.log(data);

          Swal.fire({
            title: data.mensaje.toUpperCase() + '!',
            text: `Caja ${data.data.nombre} actualizada con éxito`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
        },
        (err) => console.error(err)
      );
    }
  }

  borrar(evento: any): void {
    const { id } = evento.data;
    console.log(id);

    this.cajaService.borrar(id).subscribe(
      (response) => {
        this.cajas = this.cajas.filter((caja) => caja.id !== id);
        Swal.fire('Caja borrada', `Caja ${id} eliminada con éxito`, 'success');
      },
      (error) => {
        console.log(error);

        Swal.fire(
          'Error!',
          'No puede borrar una caja con movimientos!',
          'error'
        );
      }
    );
  }
}
