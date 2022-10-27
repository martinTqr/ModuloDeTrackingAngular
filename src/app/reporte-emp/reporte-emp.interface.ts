import { Reporte } from '../interfaces';

//extend for the interface Reporte the next data
export interface ReporteEmpresa extends Reporte {
  nombreUnidadDeNegocio: string;
}
