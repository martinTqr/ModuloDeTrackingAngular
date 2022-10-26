import { Injectable } from '@angular/core';
import { Reporte } from './arbol.interaces';
import { reporteUnidadDeNegocio } from './constantes';
import { reporteEmpresa } from './constantes/reprote-empresa';

@Injectable({
  providedIn: 'root',
})
export class ArbolService {
  buscarReporteUnidadDeNegocio(): Reporte {
    return reporteUnidadDeNegocio;
  }
  buscarReporteEmpresa(): Reporte[] {
    return reporteEmpresa;
  }
}
