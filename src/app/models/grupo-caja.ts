import { Acumulado, TotalesMes } from '../interfaces';

export class GrupoCaja {
  id?: number;
  nombre: string;
  idEmpresa: number;
  subcategorias?: any[] = [];
  acumulado?: Acumulado;
  meses?: TotalesMes[];
  fechaBorrado?: number;
  constructor({ id, nombre, idEmpresa, fechaBorrado }: any) {
    this.id = id;
    this.nombre = nombre;
    this.idEmpresa = idEmpresa;
    this.fechaBorrado = fechaBorrado;
  }
}
