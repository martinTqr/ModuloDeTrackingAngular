import { Injectable } from '@angular/core';
import { reporteEmpresaReducido } from '../constantes';
import { reporteEmpresa } from '../constantes/reporte-empresa';
import {
  ReporteEmpresaReducido,
  ReportesDeEmpresa,
} from './reporte-emp.interface';

@Injectable({
  providedIn: 'root',
})
export class ReporteEmpresaService {
  buscarReporteEmpresa(): ReportesDeEmpresa {
    return reporteEmpresa;
  }
  buscarReporteEmpresaReducido(): ReporteEmpresaReducido[] {
    return reporteEmpresaReducido;
  }
}
