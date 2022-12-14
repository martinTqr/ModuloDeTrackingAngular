import { Acumulado, Categoria, Reporte, TotalesMes } from '../interfaces';

//extend for the interface Reporte the next data
export interface ReporteEmpresa extends Reporte {
  nombre?: string;
}
export interface ReportesDeEmpresa {
  reportes: ReporteEmpresa[];
  categoriasGenerales: Categoria[];
}

export interface ReporteEmpresaReducido {
  nombre: string;
  acumulado?: Acumulado;
  meses: TotalesMes[];
  subcategorias: ReporteEmpresaReducido[] | Categoria[];
}
