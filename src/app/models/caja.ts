export class Caja {
  id?: number;
  idEmpresa: number;
  nombre: string;
  negativa: boolean;
  fechaBorrado?: number;
  constructor({ id, nombre, idEmpresa, negativa, fechaBorrado }: any) {
    this.id = id;
    this.idEmpresa = idEmpresa;
    this.nombre = nombre;
    this.negativa = negativa;
    this.fechaBorrado = fechaBorrado;
  }
}
