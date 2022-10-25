export interface Categoria {
  id: number;
  nombre: string;
  tipo: string;
  idEmpresa: string | null;
  idCategoriaPadre: string | null;
  orden: number | string;
  fechaBorrado: string | Date | null;
  subcategorias: Categoria[];
  acumulado: Acumulado;
  meses?: Totales[];
  cantidadDeSubcategorias?: number;
}
export enum TipoCategoria {
  in = 'in',
  out = 'out',
}
export interface Caja {
  id: number;
  nombre: string;
  idUnidadNegocio: string;
  negativa: boolean;
  fechaBorrado: string | Date | null;
  total: number;
  meses: Totales[];
}
export type CategoriaYCajas = Categoria & Caja;
export interface Totales {
  total: number;
  semanas: {
    fechaInicio?: string;
    fechaFin?: string;
    total: number;
  }[];
}
export interface Acumulado {
  total: number;
  cajas: Caja[];
}
