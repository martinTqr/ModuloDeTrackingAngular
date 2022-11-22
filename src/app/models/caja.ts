import { GrupoCaja } from './grupo-caja';

export class Caja {
  id?: number;
  idEmpresa: number;
  idGrupoCaja: number;
  nombre: string;
  negativa: boolean;
  fechaBorrado?: number;
  total?: number;
  grupoCaja?: GrupoCaja;
  constructor({
    id,
    nombre,
    idEmpresa,
    idGrupoCaja,
    negativa,
    fechaBorrado,
  }: any) {
    this.id = id;
    this.idEmpresa = idEmpresa;
    this.idGrupoCaja = idGrupoCaja;
    this.nombre = nombre;
    this.negativa = negativa;
    this.fechaBorrado = fechaBorrado;
  }
}
