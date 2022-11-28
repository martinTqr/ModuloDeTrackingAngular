export class Usuario {
  id?: number;
  idEmpresa: number;
  nombreCompleto: string;
  email: string;
  fechaCreacion?: Date;
  fechaBorrado?: number;
  constructor({ id, idEmpresa, nombreCompleto, email, fechaCreacion }: any) {
    this.id = id;
    this.idEmpresa = idEmpresa;
    this.nombreCompleto = nombreCompleto;
    this.email = email;
    this.fechaCreacion = fechaCreacion;
  }
}
