export class UnidadNegocio {
  id?: number;
  nombre: string;
  idEmpresa: string | number;
  fechaBorrado?: number;
  constructor({ id, nombre, idEmpresa, fechaBorrado }: any) {
    this.id = id;
    this.nombre = nombre;
    this.idEmpresa = idEmpresa;
    this.fechaBorrado = fechaBorrado;
  }
}
