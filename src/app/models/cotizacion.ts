export class Cotizacion {
  id?: number;
  idEmpresa: number;
  valor: number;
  fecha: Date | String;
  constructor({ id, idEmpresa, valor, fecha }: any) {
    this.id = id;
    this.idEmpresa = idEmpresa;
    this.valor = valor;
    this.fecha = fecha;
  }
}
