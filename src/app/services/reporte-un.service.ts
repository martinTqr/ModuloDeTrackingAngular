import { Injectable } from '@angular/core';
import { reporteUnidadDeNegocio } from '../constantes';
import { Reporte } from '../interfaces/reporte.interaces';

@Injectable({
  providedIn: 'root',
})
export class ReporteUNService {
  buscarReporteUnidadDeNegocio(): Reporte {
    return reporteUnidadDeNegocio;
  }
}
