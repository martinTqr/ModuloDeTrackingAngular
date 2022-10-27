export interface Reporte {
  total: number;
  cajas: Caja[];
  subcategorias: (Categoria | Caja)[];
  unidadDeNegocio?: string;
  ingresos?: Categoria;
  egresos?: Categoria;
}
export interface Categoria {
  id: number;
  nombre: string;
  tipo: string;
  idEmpresa: string | null;
  idCategoriaPadre: string | null;
  orden: number | string;
  fechaBorrado: string | Date | null;
  subcategorias?: Categoria[];
  acumulado: Acumulado;
  meses: Totales[];
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
    semana?: string | null;
    total: number;
  }[];
}
export interface Acumulado {
  total: number;
  cajas: Caja[];
}
