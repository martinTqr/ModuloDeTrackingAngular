export class Empresa {
  id?: number;
  nombre: string;
  fechaBorrado?: number;
  fechaCreacion?: Date;
  constructor({ id, nombre, fechaBorrado, fechaCreacion }: any) {
    this.id = id;
    this.nombre = nombre;
    this.fechaBorrado = fechaBorrado;
    this.fechaCreacion = fechaCreacion;
  }
}
