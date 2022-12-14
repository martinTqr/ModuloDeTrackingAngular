import { GrupoCaja } from './grupo-caja';

export class Caja {
  id?: number;
  idEmpresa: number;
  idGrupoCaja: number;
  nombre: string;
  negativa: boolean;
  prioritaria?: boolean;
  fechaBorrado?: number;
  total?: number;
  grupoCaja?: GrupoCaja;
  fechaCreacion?: Date;
  constructor({
    id,
    nombre,
    idEmpresa,
    idGrupoCaja,
    negativa,
    fechaBorrado,
    fechaCreacion,
    prioritaria,
  }: any) {
    this.id = id;
    this.idEmpresa = idEmpresa;
    this.idGrupoCaja = idGrupoCaja;
    this.nombre = nombre;
    this.negativa = negativa;
    this.fechaBorrado = fechaBorrado;
    this.fechaCreacion = fechaCreacion;
    this.prioritaria = prioritaria;
  }
}
