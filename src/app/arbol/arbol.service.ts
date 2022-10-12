import { Injectable } from '@angular/core';
import { Acumulado, Categoria, TipoCategoria } from './arbol.interaces';
import { Reporte, reporte } from './constante';

@Injectable({
  providedIn: 'root',
})
export class ArbolService {
  buscarCategorias(): Reporte {
    return reporte;
  }
}
