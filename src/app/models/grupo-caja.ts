export class GrupoCaja {
  id?: number;
  nombre: string;
  fechaBorrado?: number;
  constructor({ id, nombre, fechaBorrado }: any) {
    this.id = id;
    this.nombre = nombre;
    this.fechaBorrado = fechaBorrado;
  }
}
