export class Caja {
  id?: number;
  nombre: string;
  idUnidadNegocio: number;
  negativa: boolean;
  fechaBorrado: number;
  constructor({ id, nombre, idUnidadNegocio, negativa, fechaBorrado }: any) {
    this.id = id;
    this.nombre = nombre;
    this.idUnidadNegocio = idUnidadNegocio;
    this.negativa = negativa;
    this.fechaBorrado = fechaBorrado;
  }
}
