import { Categoria, Reporte } from '../interfaces';

//extend for the interface Reporte the next data
export interface ReporteEmpresa extends Reporte {
  nombre?: string;
}
export interface ReportesDeEmpresa {
  reportes: ReporteEmpresa[];
  categoriasGenerales: Categoria[];
}
