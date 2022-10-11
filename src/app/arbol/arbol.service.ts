import { Injectable } from '@angular/core';
import { Acumulado, Categoria, TipoCategoria } from './arbol.interaces';
import { reporte } from './constante';

@Injectable({
  providedIn: 'root',
})
export class ArbolService {
  buscarCategorias(): Categoria[] {
    return reporte;
  }
}
