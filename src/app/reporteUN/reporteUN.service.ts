import { Injectable } from '@angular/core';
import { Reporte } from './reporteUN.interaces';
import { reporteUnidadDeNegocio } from './constantes';
import { reporteEmpresa } from './constantes/reprote-empresa';

@Injectable({
  providedIn: 'root',
})
export class ReporteUNService {
  buscarReporteUnidadDeNegocio(): Reporte {
    return reporteUnidadDeNegocio;
  }
  buscarReporteEmpresa(): Reporte[] {
    return reporteEmpresa;
  }
}
