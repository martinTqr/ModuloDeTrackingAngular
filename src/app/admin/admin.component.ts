import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../services/cotizacion.service';
import { Cotizacion, Empresa } from '../models';
import { parsearFecha } from '../helper';
import { LocalService } from '../services/local.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  ultimaCotizacion: Cotizacion;
  empresa: Empresa;
  constructor(
    private cotizacionService: CotizacionService,
    private localService: LocalService
  ) {}
  ngOnInit(): void {
    this.cargarUltimaCotizacion();
    this.cargarEmpresa();
  }

  cargarEmpresa() {
    this.empresa = this.localService.getData('empresa');
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
