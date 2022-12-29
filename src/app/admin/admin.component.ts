import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../services/cotizacion.service';
import { Cotizacion } from '../models';
import { parsearFecha } from '../helper';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  ultimaCotizacion: Cotizacion;
  constructor(private cotizacionService: CotizacionService) {}
  ngOnInit(): void {
    this.cargarUltimaCotizacion();
  }

  cargarUltimaCotizacion() {
    this.cotizacionService.ultimo().subscribe({
      next: (cotizacion) => {
        if (cotizacion) {
          const fechaArray = String(cotizacion.fecha).split('-');
          const fechaDDMMYY = `${fechaArray[2].slice(0, 2)}/${fechaArray[1]}/${
            fechaArray[0]
          }`;
          cotizacion.fecha = parsearFecha(String(fechaDDMMYY));
          this.ultimaCotizacion = cotizacion;
        }
      },
    });
  }
}
