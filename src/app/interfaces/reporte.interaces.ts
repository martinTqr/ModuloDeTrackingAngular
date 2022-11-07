export interface Reporte {
  total: number;
  cajas: Caja[];
  subcategorias: (Categoria | Caja)[];
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
  meses: TotalesMes[];
  isGeneral: boolean;
}
enum TipoCategoria {
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
  meses: TotalesMes[];
}
export type CategoriaYCajas = Categoria & Caja;
export interface TotalesMes {
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
