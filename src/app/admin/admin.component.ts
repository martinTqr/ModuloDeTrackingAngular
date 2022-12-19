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
        cotizacion.fecha = parsearFecha(String(cotizacion.fecha));
        this.ultimaCotizacion = cotizacion;
      },
    });
  }
}
