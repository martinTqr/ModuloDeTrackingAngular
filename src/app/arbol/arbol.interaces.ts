export interface Categoria {
  id: number;
  nombre: string;
  tipo: string;
  idEmpresa: string;
  idCategoriaPadre: string | null;
  orden: string;
  fechaBorrado: string | Date | null;
  subcategorias: Categoria[];
  acumulado: Acumulado;
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
}
export interface Acumulado {
  total: number;
  cajas: Caja[];
}
