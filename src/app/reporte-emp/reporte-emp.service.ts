import { Injectable } from '@angular/core';
import { reporteEmpresa } from '../constantes/reprote-empresa';
import { ReportesDeEmpresa } from './reporte-emp.interface';

@Injectable({
  providedIn: 'root',
})
export class ReporteEmpresaService {
  buscarReporteEmpresa(): ReportesDeEmpresa {
    return reporteEmpresa;
  }
}
