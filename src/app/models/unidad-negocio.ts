export class UnidadNegocio {
  id?: number;
  nombre: string;
  idEmpresa: string | number;
  fechaBorrado?: number;
  fechaCreacion?: Date;
  constructor({ id, nombre, idEmpresa, fechaBorrado, fechaCreacion }: any) {
    this.id = id;
    this.nombre = nombre;
    this.idEmpresa = idEmpresa;
    this.fechaBorrado = fechaBorrado;
    this.fechaCreacion = fechaCreacion;
  }
}
