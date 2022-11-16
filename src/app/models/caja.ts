export class Caja {
  id?: number;
  nombre: string;
  negativa: boolean;
  fechaBorrado?: number;
  constructor({ id, nombre, negativa, fechaBorrado }: any) {
    this.id = id;
    this.nombre = nombre;
    this.negativa = negativa;
    this.fechaBorrado = fechaBorrado;
  }
}
