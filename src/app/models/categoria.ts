export class Categoria {
  id?: number;
  nombre: string;
  tipo: TipoCategoria | string;
  idEmpresa: number;
  idCategoriaPadre: number | null | undefined;
  orden: number;
  fechaBorrado?: string | null;
  isGeneral: boolean;
  subcategorias?: Categoria[];
  fechaCreacion?: Date;
  constructor({
    id,
    nombre,
    tipo,
    idEmpresa,
    idCategoriaPadre,
    orden,
    fechaBorrado,
    isGeneral,
    subcategorias,
    fechaCreacion,
  }: any) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.idEmpresa = idEmpresa;
    this.idCategoriaPadre = idCategoriaPadre;
    this.orden = orden;
    this.fechaBorrado = fechaBorrado;
    this.isGeneral = isGeneral;
    this.subcategorias = subcategorias;
    this.fechaCreacion = fechaCreacion;
  }
}
export enum TipoCategoria {
  in = 'in',
  out = 'out',
}
