export class NuevoMovimiento {
  id?: number;
  idUsuario: number;
  idCaja: any;
  idUnidadNegocio?: number;
  idCategoria: number;
  monto: number;
  detalle?: string;
  fecha: Date;
  fechaCreacion?: Date;

  constructor({
    idUsuario,
    idCaja,
    idUnidadNegocio,
    idCategoria,
    monto,
    detalle,
    fecha,
    fechaCreacion,
  }: any) {
    this.idUsuario = idUsuario;
    this.idCaja = idCaja;
    this.idUnidadNegocio = idUnidadNegocio;
    this.idCategoria = idCategoria;
    this.monto = monto;
    this.detalle = detalle;
    this.fecha = fecha;
    this.fechaCreacion = fechaCreacion;
  }
}
export interface Movimiento {
  id: number;
  idUsuario: number;
  caja: any;
  idUnidadNegocio?: number;
  categoria: any;
  monto: number;
  detalle?: string;
  fecha: Date;
}
