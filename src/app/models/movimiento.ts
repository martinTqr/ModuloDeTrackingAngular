export class Movimiento {
  id: number;
  idUsuario: number;
  caja: any;
  idUnidadNegocio: number;
  categoria: any;
  monto: number;
  detalle: string;
  fecha: Date;

  constructor(
    id: number,
    idUsuario: number,
    caja: any,
    idUnidadNegocio: number,
    categoria: number,
    monto: number,
    detalle: string,
    fecha: Date
  ) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.caja = caja;
    this.idUnidadNegocio = idUnidadNegocio;
    this.categoria = categoria;
    this.monto = monto;
    this.detalle = detalle;
    this.fecha = fecha;
  }
}
