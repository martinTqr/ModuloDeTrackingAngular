import { Acumulado, TotalesMes } from '../interfaces';

export class GrupoCaja {
  id?: number;
  nombre: string;
  idEmpresa: number;
  prioritaria?: boolean;
  subcategorias?: any[] = [];
  cajas?: any[] = [];
  acumulado?: Acumulado;
  meses?: TotalesMes[];
  fechaBorrado?: number;
  collapsed?: boolean;
  fechaCreacion?: Date;
  constructor({
    id,
    nombre,
    idEmpresa,
    fechaBorrado,
    fechaCreacion,
    prioritaria,
  }: any) {
    this.id = id;
    this.nombre = nombre;
    this.idEmpresa = idEmpresa;
    this.prioritaria = prioritaria;
    this.fechaBorrado = fechaBorrado;
    this.fechaCreacion = fechaCreacion;
  }
}
