export class Categoria {
  id?: number;
  nombre: string;
  tipo: TipoCategoria | string;
  idEmpresa: number;
  idCategoriaPadre: number | null;
  orden: number;
  fechaBorrado?: string | null;
  isGeneral: boolean;
  subcategorias?: Categoria[];
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
  }
}
export enum TipoCategoria {
  in = 'in',
  out = 'out',
}
