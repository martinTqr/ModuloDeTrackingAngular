import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Caja } from '../models';
import { CajaService } from '../services/caja.service';

@Component({
  selector: 'app-lista-cajas',
  templateUrl: './lista-cajas.component.html',
  styleUrls: ['./lista-cajas.component.css'],
})
export class ListaCajasComponent implements OnInit {
  cajas: Caja[] = [];
  constructor(private cajaService: CajaService) {}

  ngOnInit(): void {
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
  borrar(id: any): void {
    this.cajaService.borrar(id).subscribe(
      (response) => {
        this.cajas = this.cajas.filter((caja) => caja.id !== id);
        Swal.fire('Caja borrada', `Caja ${id} eliminada con éxito`, 'success');
      },
      (error) => {
        Swal.fire(
          'Error!',
          'No puede borrar una caja con movimientos!',
          'error'
        );
      }
    );
  }
}
