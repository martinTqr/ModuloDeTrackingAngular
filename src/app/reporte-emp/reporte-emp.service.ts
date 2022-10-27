import { Injectable } from '@angular/core';
import { reporteEmpresa } from '../constantes/reprote-empresa';
import { Reporte } from '../interfaces/reporte.interaces';

@Injectable({
  providedIn: 'root',
})
export class ReporteEmpresaService {
  buscarReporteEmpresa(): Reporte[] {
    return reporteEmpresa;
  }
}
